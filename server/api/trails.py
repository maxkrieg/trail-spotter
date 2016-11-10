# -*- coding: utf-8 -*-
from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from app import db

trails_api = Api(Blueprint('trails_api', __name__))  # pylint: disable=invalid-name

parser = reqparse.RequestParser()
parser.add_argument('lat', type=float, location='json')
parser.add_argument('lng', type=float, location='json')


@trails_api.resource('/trails')
class TrailsAPI(Resource):
    @staticmethod
    def post():
        args = parser.parse_args(strict=True)
        lat = args['lat']
        lng = args['lng']
        return {
            'lat': lat,
            'lng': lng
        }
