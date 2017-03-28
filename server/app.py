import os
import urllib

from flask.ext.sqlalchemy import SQLAlchemy
import logging
# from sys import stdout
from flask import Flask, url_for

db = SQLAlchemy()

from api.trails import trails_api
from views.index import index_view


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
    app.config['SERVER_NAME'] = os.environ['SERVER_NAME']
    app.config['DEBUG'] = os.environ['FLASK_DEBUG']

    register_blueprints(app)

    db.init_app(app)
    init_logging(app)

    return app


def register_blueprints(app):
    app.register_blueprint(trails_api.blueprint, url_prefix='/api')
    app.register_blueprint(index_view)


def init_logging(app):

    level = logging.ERROR
    if app.debug:
        level = logging.DEBUG

    app.logger.setLevel(level)
    # handler = logging.StreamHandler(stdout)
    # app.logger.addHandler(handler)
    log_env_and_routes(app)


def log_env_and_routes(app):
    print "-----------------------------------"
    print "OS Environment"
    print "-----------------------------------"
    for key, value in os.environ.iteritems():
        if 'npm' not in key:
            print "{}: {}".format(key, value)

    print "-----------------------------------"
    print "Flask App Configuration"
    print "-----------------------------------"
    for key, value in dict(app.config).iteritems():
        print "{}: {}".format(key, value)

    print "-----------------------------------"
    print "Routes"
    print "-----------------------------------"
    with app.app_context():
        output = []
        for rule in app.url_map.iter_rules():
            options = {}
            for arg in rule.arguments:
                options[arg] = "[{0}]".format(arg)

            methods = ','.join(rule.methods)
            url = url_for(rule.endpoint, **options)
            line = urllib.unquote("{:30s} {:10s} {}".format(rule.endpoint, methods, url))
            output.append(line)

        for line in sorted(output):
            print line
