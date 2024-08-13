import sqlite3
from random import uniform
import json


def get_db_connection():
    conn = sqlite3.connect("app/datas/veiculos.db")
    conn.row_factory = sqlite3.Row
    return conn


def initialize_database():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS veiculos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_carro TEXT NOT NULL,
            dono TEXT NOT NULL,
            marca TEXT NOT NULL,
            modelo TEXT NOT NULL,
            motor TEXT NOT NULL,
            cambio TEXT NOT NULL,
            ano TEXT NOT NULL,
            cor TEXT NOT NULL,
            freio TEXT NOT NULL,
            direcao TEXT NOT NULL,
            portas TEXT NOT NULL,
            valor TEXT NOT NULL,
            cidade TEXT NOT NULL,
            estado TEXT NOT NULL,
            desc TEXT NOT NULL,
            fotos TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

initialize_database()


TODOS_VEICULOS = []


class Veiculos ():

    def __init__(self, id, dono, marca, modelo, motor, cambio, ano, cor, freio, direcao, portas, valor, cidade, estado, desc, fotos):
        self.marca = marca
        self.id = id
        self.desc = desc
        self.fotos = fotos
        self.modelo = modelo
        self.motor = motor
        self.cambio = cambio
        self.ano = ano
        self.cor = cor
        self.freio = freio
        self.direcao = direcao
        self.portas = portas
        self.valor = valor
        self.cidade = cidade
        self.estado = estado
        self.dono = dono
        TODOS_VEICULOS.append(self)


    def removeVehicleInDatabse():
        pass

    def addVehicleInDatabase(self):
        tab = self
        c = get_db_connection()
        cursor = c.cursor()
        cursor.execute('''
            INSERT INTO veiculos (
            id_carro,
            dono,
            marca,
            modelo,
            motor,
            cambio,
            ano,
            cor,
            freio,
            direcao,
            portas,
            valor,
            cidade,
            estado,
            desc,
            fotos
            ) VALUES (
                ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
            )

        ''', (tab.id,tab.dono,tab.marca,tab.modelo,tab.motor,
            tab.cambio, tab.ano,tab.cor,tab.freio,
            tab.direcao,tab.portas,tab.valor,tab.cidade,
            tab.estado, tab.desc, tab.fotos))
        c.commit()
        c.close()


def getAllObjects():
    tabela = []
    for v in TODOS_VEICULOS:
        obj = {}
        atributos = [a for a in dir(v) if not callable(getattr(v, a)) and not a.startswith('__')]
        for i in atributos:
            obj[i] = getattr(v, i)
        tabela.append(obj)
    return tabela


def addNewCar(dono, marca, modelo, motor, cambio, ano, cor, freio, direcao, portas, valor, cidade, estado, desc, list_fotos):
    list_fotos = json.dumps(list_fotos)
    id = f"{dono}-{str(uniform(0, 100))}"
    id = id.replace(".", "-")
    car = Veiculos(id, dono, marca, modelo, motor, cambio, ano, cor, freio, direcao, portas, valor, cidade, estado, desc, list_fotos)
    car.addVehicleInDatabase()


def createAllClassVehiclesInDatabase():
    c = get_db_connection()
    cursor = c.cursor()
    cursor.execute("SELECT * FROM veiculos")
    all = cursor.fetchall()
    for v in all:
        Veiculos(v[1],v[2],v[3],v[4],v[5],v[6],v[7],v[8],v[9],v[10],v[11],v[12], v[13], v[14], v[15], v[16])

def getItemFromID(id):
    obj = {}
    for item in TODOS_VEICULOS:
        if item.id == id:
            atributos = [a for a in dir(item) if not callable(getattr(item, a)) and not a.startswith('__')]
            for i in atributos:
                obj[i] = getattr(item, i)

    return obj    
    

createAllClassVehiclesInDatabase()