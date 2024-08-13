from flask import Flask


app = Flask(__name__)


from app.controllers import rotas
from app.controllers.funcoes import home