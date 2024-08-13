from app import app 
from flask import render_template
from app.models.veiculos import veiculo
import json


@app.route("/")
@app.route("/home")
def index ():
    return render_template("home/home.html")

@app.route("/pesquisa")
def pesquisa ():
    return render_template("pesquisa/pesquisa.html")

@app.route("/resposta")
def resposta ():
    return render_template("pesquisa/resposta.html")

@app.route("/adicionar")
def adicionar ():
    return render_template("adicionar/adicionar.html") 

@app.route('/item/<item_id>')
def item(item_id):
 
    item = veiculo.getItemFromID(item_id)

    if type(item['fotos']) == type("string") :
        item['fotos'] = [s.replace("app/", "../../") for s in json.loads(item['fotos'])]

    if not item:
        return "Ops, veiculo nao encontrado"
    
    return render_template('itens/item.html', item=item)