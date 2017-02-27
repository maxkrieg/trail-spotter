import os
from flask.ext.sqlalchemy import SQLAlchemy
from logging import StreamHandler
from sys import stdout
from flask import Flask

db = SQLAlchemy()


def create_app():
    from api.kittens import kittens_api
    from api.trails import trails_api
    from views.index import index_view

    app = Flask(__name__)
    print " "
    print "CREATE APP WITH ENVIRONMENT:"
    print "--------------------------------"
    for key, value in os.environ.iteritems():
        print key + ": " + value
    print "--------------------------------"
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']

    app.register_blueprint(trails_api.blueprint, url_prefix='/api')
    app.register_blueprint(index_view)

    db.init_app(app)

    handler = StreamHandler(stdout)
    app.logger.addHandler(handler)
    return app
