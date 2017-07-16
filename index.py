from flask import Flask
from flask import render_template

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

if __name__ == "__main__":
	app.debug = True
	app.run()
