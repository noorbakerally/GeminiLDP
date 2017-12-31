from flask import Flask
from flask import render_template
from flask import request
import requests 
import json
from rdflib import Graph, Literal, BNode, Namespace, RDF, URIRef
import urllib

app = Flask(__name__)

jinja_options = app.jinja_options.copy()

jinja_options.update(dict(
    block_start_string='<%',
    block_end_string='%>',
    variable_start_string='%%',
    variable_end_string='%%',
    comment_start_string='<#',
    comment_end_string='#>'
))
app.jinja_options = jinja_options

@app.route("/")
def hello():
	return render_template('index.html')

def getName(s):
	if s[-1] == "/":
		s = s[:-1]
	name = s[s.rfind("/")+1:]
	return name

@app.route("/getResource")
def getResource():
	ldpr = request.args.get('ldpr')
	pd = ldpr.find(":")
	ldprEncoded = ldpr[pd+1:]
	ldprEncoded = urllib.quote(ldprEncoded.encode('utf8'))
	ldpr = ldpr[:pd+1] + ldprEncoded
	
	r = requests.get(ldpr)
	

	resource = {}
	resource["contentType"] = r.headers['content-type']
	
	resource["iri"] = ldpr
	resource["name"] = getName(ldpr)
	resource["status"] = r.status_code
	# get rdf content for resource
	# get all children
	# for each children check if container or not
	# if container add a dummy children
	
	if (r.status_code != 200):
		return json.dumps(resource)
	
	
	ldprContent = r.text
	resource["type"] = []	
	linkHeaders = r.headers.get("link")
	linkHeaders = requests.utils.parse_header_links(r.headers.get("link"))
	for link in linkHeaders:
		if "rel" in link and link["rel"] == "type":
			ldprType = link["url"]
			ldprType = ldprType.replace("http://www.w3.org/ns/ldp#","")
			resource["type"].append(ldprType)	
	
	if "RDFSource" not in resource["type"]:
		resource["data"] = r.text

	g = Graph()
	publicId = ldpr
	if publicId[-1] != "/":
		publicId = publicId + "/"	
	g.parse(data = ldprContent,format="turtle",publicID=publicId)

	resource["data"] = g.serialize(format="turtle")
	query = "SELECT * WHERE { <resource> <http://www.w3.org/ns/ldp#contains> ?x }"
	query = query.replace("resource", ldpr)
	#print query
	#return resource["data"]
	qResult = g.query(query)
	children = []
	for row in qResult:
		iri = row[0]
		print iri
		children.append({"name":getName(iri),"iri":iri,"fetch":0})
	resource["children"] = children
	resource["fetch"] = 1

	
	resourceStr = json.dumps(resource)
	return resourceStr

if __name__ == "__main__":
	app.debug = True
	app.run()
