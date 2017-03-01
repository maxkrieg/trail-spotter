import os
import urllib

from flask.ext.sqlalchemy import SQLAlchemy
import logging
from sys import stdout
from flask import Flask, url_for

db = SQLAlchemy()

from api.trails import trails_api
from views.index import index_view


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
    app.config['SERVER_NAME'] = os.environ['SERVER_NAME']

    register_blueprints(app)
    log_env_and_routes(app)

    db.init_app(app)

    app.logger.setLevel(logging.INFO)
    app.logger.addHandler(logging.StreamHandler(stdout))
    return app


def register_blueprints(app):
    app.register_blueprint(trails_api.blueprint, url_prefix='/api')
    app.register_blueprint(index_view)


def log_env_and_routes(app):
    print " "
    print "--------------------------------"
    print "ENVIRONMENT:"
    for key, value in os.environ.iteritems():
        if 'npm' not in key:
            print key + ": " + value

    print "--------------------------------"
    with app.app_context():
        output = []
        for rule in app.url_map.iter_rules():

            options = {}
            for arg in rule.arguments:
                options[arg] = "[{0}]".format(arg)

            methods = ','.join(rule.methods)
            url = url_for(rule.endpoint, **options)
            line = urllib.unquote("{:50s} {:20s} {}".format(rule.endpoint, methods, url))
            output.append(line)

        for line in sorted(output):
            print line
