# -*- coding: utf-8 -*-
from datetime import datetime

from app import db


class Trail(db.Model):
    __tablename__ = 'trails'

    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, default=datetime.utcnow)

    lat = db.Column(db.Float(precision=5, asdecimal=False), nullable=False)
    lng = db.Column(db.Float(precision=5, asdecimal=False), nullable=False)
    title = db.Column(db.String(256))
    description = db.Column(db.String(1024))
