import ast
import os
import sqlite3
import subprocess
import requests
from flask import Flask, request

app = Flask(__name__)

@app.route("/porta-termica")
def porta_termica():
    alvo = request.args.get("alvo", "")
    with sqlite3.connect("rebeldes.db") as conn:
        return str(conn.execute("SELECT * FROM pilotos WHERE nome = ?", (alvo,)).fetchall())

@app.route("/holocron")
def holocron():
    permitidos = {"status": ["/usr/bin/printf", "%s", "operacional"], "data": ["/usr/bin/date", "-u"]}
    cmd = request.args.get("cmd", "")
    if cmd not in permitidos:
        return "Comando não permitido", 400
    return subprocess.check_output(permitidos[cmd], timeout=3)

@app.route("/forca")
def forca():
    valor = request.args.get("exp", "")
    if len(valor) > 100:
        return "Entrada muito longa", 400
    try:
        numero = float(valor)
    except ValueError:
        return "Informe um número", 400
    return str(numero)

@app.route("/aliados")
def aliados():
    r = requests.get("https://aliados.rebeldes.org/lista", timeout=5)
    r.raise_for_status()
    return r.text

if __name__ == "__main__":
    app.run(debug=False, host="127.0.0.1")
