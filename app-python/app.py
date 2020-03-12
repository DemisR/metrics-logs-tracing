#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
import random
import requests
from jaeger_client import Config
from flask_opentracing import FlaskTracer
from flask import Flask, request , json , jsonify
from os import getenv
from prometheus_flask_exporter import PrometheusMetrics

JAEGER_HOST = getenv('JAEGER_HOST', 'localhost')
app = Flask(__name__)
metrics = PrometheusMetrics(app, path='/metrics')

# Create configuration object with enabled logging and sampling of all requests.
config = Config(config={'sampler': {'type': 'const', 'param': 1},
                        'logging': True,
                        'local_agent':
                        # Also, provide a hostname of Jaeger instance to send traces to.
                        {'reporting_host': JAEGER_HOST}},
                # Service name can be arbitrary string describing this particular web service.
                service_name="app-python")

            
jaeger_tracer = config.initialize_tracer()
tracer = FlaskTracer(jaeger_tracer, True, app)

class BadRequest(Exception):
    """Custom exception class to be thrown when local error occurs."""
    def __init__(self, message, status=400, payload=None):
        self.message = message
        self.status = status
        self.payload = payload


@app.errorhandler(BadRequest)
def handle_bad_request(error):
    """Catch BadRequest exception globally, serialize into JSON, and respond with 400."""
    payload = dict(error.payload or ())
    payload['status'] = error.status
    payload['message'] = error.message
    return jsonify(payload), payload['status'] 

@app.route('/')
def main():
    pass  # requests tracked by default


@app.route('/delay')
def models():
    # Extract the span information for request object.
    # SLOWING QUERY
    time.sleep(random.random() * 0.3)

    with jaeger_tracer.start_active_span(
        'Retrieve list of models') as scope:
        # SLOWING QUERY
        r = requests.get('http://httpbin.org/delay/' + str(random.random() * 0.8))
        models = [{"id": 1, "name": "model S"}, {"id": 2, "name": "model X"}, {"id": 3, "name": "model 3"}]

        return jsonify(models)


@app.route('/car-info', methods=['POST'])
def carinfo():
    # Extract the span information for request object.
    # SLOWING QUERY
    time.sleep(random.random() * 0.3)
    try:
        req_data = request.get_json()
        name = req_data['name']
        brand = req_data['brand']
        if name != "Model 3":
            raise BadRequest('Car details not found', 404, { 'name': req_data['name'] })
    except:
        raise BadRequest('Bad payload', 400, req_data )

    car_info = {
        "Model name": "Model 3", 
        "Manufacter": "Tesla, Inc.",
        "Energy" : "Electric",
        "Electric range" : "(WLTP) 409 to 560 km",
        "CO2" : "0 g/km",
        "Power" : "275 to 462 ch",
        "Image" : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Tesla_Model_3_parked%2C_front_driver_side.jpg/280px-Tesla_Model_3_parked%2C_front_driver_side.jpg"
        }
    return jsonify(car_info)


@app.route('/github')
def github():
    url = "https://api.github.com"
    headers = { 'Accept' : 'application/vnd.github.v3+json'}

    try:

        response = requests.get(url + '/users/' + 'DemisR' + '/repos', headers=headers)

        repositories = []
        for repository in response.json():
            item = {
                'name' : repository['name'],
                'description' : repository['description'],
                'html_url' : repository['html_url']
            }
            repositories.append(item)

        return jsonify(repositories)

    except:
        return json.dumps({ "error": error }), 500




if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
