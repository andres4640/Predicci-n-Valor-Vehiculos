from flask import Flask, request
from flask_restful import Resource, Api, reqparse
import sys
import joblib
from flask_cors import CORS
import requests

app = Flask(__name__)

app.config['CORS_RESOURCES'] = {r"/*": {"origins": "*"}}
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, resources = {
    r"/*": {"origins":"*"}
})

#api = Api(app)
@app.route('/predecir',methods=['POST'])
def func():
    try:
        x = requests.get('https://free.currconv.com/api/v7/convert?q=INR_USD&compact=ultra&apiKey=4bdb991298948b6e21b7')
        json_response = x.json()
        cambio_moneda = float(json_response["INR_USD"])

        data = request.get_json(force = True)
        print("Datos", data)
        inputs = [[data["km_driven"], data["fuel"], data["seller_type"], data["transmission"], data["owner"], float(data["seats"]), float(data["mileage"]), float(data["max_power"]), int(data["engine"]),  float(data["torque"]), int(data["antiguedad"])]]
        print("inputs: ", inputs)
        modelo = joblib.load("MLPipeline.joblib")
        print("Modelo cargado")

        resultado = modelo.predict(inputs)
        print("Resultado: ", resultado)
        headers = {'Access-Control-Allow-Origin': '*'}
        return str(round(resultado[0]*cambio_moneda,2))
    except:
        e = sys.exc_info()[0]
        print("Error: ", e)
        return str(e)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)