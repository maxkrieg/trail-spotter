# -*- coding: utf-8 -*-
from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from services.trails import create_trail
from services.trails import get_all_trails

trails_api = Api(Blueprint('trails_api', __name__))

parser = reqparse.RequestParser()
parser.add_argument('lat', type=float, location='json')
parser.add_argument('lng', type=float, location='json')
parser.add_argument('title', type=str, location='json')
parser.add_argument('description', type=str, location='json')


@trails_api.resource('/trails')
class TrailsAPI(Resource):
    @staticmethod
    def get():
        trails = get_all_trails()
        return trails

    @staticmethod
    def post():
        args = parser.parse_args(strict=True)
        lat = args['lat']
        lng = args['lng']
        title = args['title']
        description = args['description']
        trail = create_trail(lat, lng, title, description)
        return trail
