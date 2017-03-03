# -*- coding: utf-8 -*-
from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from services.trails import create_trail
from services.trails import get_all_trails

import logging
logger = logging.getLogger('app')

trails_api = Api(Blueprint('trails_api', __name__))

post_parser = reqparse.RequestParser()
post_parser.add_argument('path', type=list, location='json', required=True)
post_parser.add_argument('title', type=str, location='json')
post_parser.add_argument('description', type=str, location='json')


@trails_api.resource('/trails')
class TrailsAPI(Resource):
    """
    API resource for accessing all trails.
    """

    @staticmethod
    def get():
        trails = get_all_trails()
        return trails

    @staticmethod
    def post():
        args = post_parser.parse_args(strict=True)
        path = args['path']
        title = args['title']
        description = args['description']
        trail = create_trail(
            path=path,
            title=title,
            description=description
        )
        return trail


@trails_api.resource('/trail/<trail_id>')
class TrailAPI(Resource):
    """
    CRUD API for a single trail.
    """

    @staticmethod
    def get(trail_id):
        pass

    @staticmethod
    def delete(trail_id):
        pass

    @staticmethod
    def put(trail_id):
        pass
