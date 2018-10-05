# -*- coding: utf-8 -*-

from marshmallow import Schema
from marshmallow import fields
# from marshmallow import ValidationError
# from marshmallow import pre_load


class TrailSchema(Schema):
    id = fields.Int()
    title = fields.Str()
    description = fields.Str()
    path = fields.List(fields.Dict())
    trail_head_address = fields.Str()
    length = fields.Number()

    created = fields.Method("format_timestamp", dump_only=True)

    def format_timestamp(self, data):
        return {
            'date': data.created.strftime("%-m/%-d/%Y"),
            'time': data.created.strftime("%-I:%M%p").lower()
        }


trail_schema = TrailSchema()
trails_schema = TrailSchema(many=True)
