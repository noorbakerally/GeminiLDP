from flask import Flask
from flask import render_template
from flask import request
import requests 
import json
from rdflib import Graph, Literal, BNode, Namespace, RDF, URIRef

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
	name = s[s.rfind("/")+1:]
	return name

@app.route("/getResource")
def getResource():
	ldpr = request.args.get('ldpr')

	r = requests.get(ldpr)

	resource = {}
	resource["iri"] = ldpr
	resource["name"] = getName(ldpr)
	# get rdf content for resource
	# get all children
	# for each children check if container or not
	# if container add a dummy children

	if (r.status_code == 200):
		ldprContent = r.text
		g = Graph()
		g.parse(data = ldprContent,format="turtle")

		resource["data"] = g.serialize(format="turtle")
		query = "SELECT * WHERE { <resource> <http://www.w3.org/ns/ldp#contains> ?x }"
		query = query.replace("resource", ldpr)
		qResult = g.query(query)
		children = []
		for row in qResult:
			iri = row[0]
			children.append({"name":getName(iri),"iri":iri,"fetch":0})
		resource["children"] = children
		resource["fetch"] = 1
	else:
		resource["status"] = r.status_code


	
	resourceStr = json.dumps(resource)
	return resourceStr

if __name__ == "__main__":
	app.debug = True
	app.run()
