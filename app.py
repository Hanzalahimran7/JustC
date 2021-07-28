from flask import Flask,request
from flask import render_template,jsonify
from Youtube import getVideos
import json

app = Flask(__name__)


@app.route('/')
def hello():
    return render_template('Index.html')

@app.route('/test')
def test():
    return render_template('test.html')


@app.route('/ytcategory')
def ytcategory():
    return render_template('ytcategory.html')

@app.route('/ytplay/<name>')
def ytplayCategories(name):
    global currentYT
    global currentindex
    global videolinks
    currentYT=name
    currentindex=-1
    videolinks=getVideos(currentYT)
    return render_template('ytplay.html')

@app.route('/getnextlink')
def getytnextlinks():
    global videolinks
    global currentindex
    currentindex+=1
    link=videolinks[currentindex]
    message = {'url': link}
    print(message)
    return jsonify(message)

@app.route('/getprevlink')
def getytprevlinks():
    global videolinks
    global currentindex
    if currentindex>0:
        link=videolinks[currentindex-1]
        currentindex-=1
    else:
        link=videolinks[0]
    message = {'url': link}
    return jsonify(message)


app.run(ssl_context=('cert.pem', 'key.pem'),host="0.0.0.0", port=5000, debug=True)