# -*- coding: utf-8 -*-
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSON

from app import db


class Trail(db.Model):
    __tablename__ = 'trails'

    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, default=datetime.utcnow)
    title = db.Column(db.String(256))
    description = db.Column(db.String(1024))
    path = db.Column(JSON)
    trail_head_address = db.Column(db.String(256))
    length = db.Column(db.Float(precision=6, asdecimal=False))
