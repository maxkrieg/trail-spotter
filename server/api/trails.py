# -*- coding: utf-8 -*-
from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from app import db
from models.trail import Trail

trails_api = Api(Blueprint('trails_api', __name__))

parser = reqparse.RequestParser()
parser.add_argument('lat', type=float, location='json')
parser.add_argument('lng', type=float, location='json')
parser.add_argument('title', type=str, location='json')
parser.add_argument('description', type=str, location='json')


@trails_api.resource('/trails')
class TrailsAPI(Resource):
    @staticmethod
    def post():
        args = parser.parse_args(strict=True)
        print args
        lat = args['lat']
        lng = args['lng']
        title = args['title']
        description = args['description']

        trail = Trail(
            lat=lat,
            lng=lng,
            title=title,
            description=description)
        db.session.add(trail)
        db.session.commit()
        return {
            'id': trail.id
        }
