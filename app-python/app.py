#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
import random
from jaeger_client import Config
from flask_opentracing import FlaskTracer
from flask import Flask, request , json
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

@app.route('/')
def main():
    pass  # requests tracked by default

@app.route('/models')
@tracer.trace()
def models():
    # Extract the span information for request object.
    with jaeger_tracer.start_active_span(
        'python webserver internal span of log method') as scope:

        models = [{"id": 1, "name": "model S"}, {"id": 2, "name": "model X"}, {"id": 3, "name": "model 3"}]

        # SLOWING QUERY
        time.sleep(random.random() * 0.8)

        return json.dumps(models)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
