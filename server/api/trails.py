# -*- coding: utf-8 -*-

from flask import Blueprint, request
from flask_restful import Api, Resource
from services.trails import create_trail
from services.trails import get_all_trails

import logging
logger = logging.getLogger('app')

trails_api = Api(Blueprint('trails_api', __name__))


@trails_api.resource('/trails')
class TrailsAPI(Resource):

    @staticmethod
    def get():
        trails = get_all_trails()
        return trails

    @staticmethod
    def post():
        json_data = request.get_json()
        if not json_data:
            return {'message': 'No trail data provided!'}, 400

        try:
            trail = create_trail(json_data)
        except ValueError as e:
            return e.message, 422

        return trail


@trails_api.resource('/trail/<trail_id>')
class TrailAPI(Resource):

    @staticmethod
    def get(trail_id):
        pass

    @staticmethod
    def delete(trail_id):
        pass

    @staticmethod
    def put(trail_id):
        pass
