from app.models.veiculos import veiculo
from app import app
from flask import jsonify, request
from random import uniform


@app.route("/getAllVehicles")
def getAllVehicles ():

    return jsonify({"response" : veiculo.getAllObjects()})


@app.route("/addVehicle", methods=["POST"])
def addVehicle ():
    
    data = request.get_json()

    dono = data["dono"]
    marca = data["marca"]
    modelo = data["modelo"]
    motor = data["motor"]
    cambio = data["cambio"]
    ano = data["ano"]
    cor = data["cor"]
    freio = "abs"
    direcao = data["direcao"]
    portas = data["portas"]
    valor = data["valor"]
    cidade = data["cidade"]
    estado = data["estado"]
    desc = data["desc"]
    list_fotos = data["fotos"]

    veiculo.addNewCar(dono, marca, modelo, motor, cambio, ano, cor, freio, direcao, portas, valor, cidade, estado, desc, list_fotos)

    return jsonify({"response" : True})


@app.route('/upload', methods=['POST'])
def upload_file():
    # Verifica se a solicitação contém um arquivo
    if 'file' not in request.files:
        return jsonify({'error': 'Nenhum arquivo enviado'}), 400

    file = request.files['file']

    # Verifica se o arquivo foi realmente enviado
    if file.filename == '':
        return jsonify({'error': 'Nenhum arquivo selecionado'}), 400

    nome = request.form.get('texto', '')
    # Salva o arquivo
    caminho = f'app/static/imagens'
    nome_arquivo = f'{nome}-{str(uniform(0, 100)).replace(".", "-")}.jpeg'
    nome_completo = caminho+"/"+nome_arquivo

    file.save(nome_completo)

    return jsonify({'response': 'Arquivo recebido com sucesso!', 'src' : nome_completo})
