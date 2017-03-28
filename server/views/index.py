# -*- coding: utf-8 -*-
from flask import render_template, Blueprint, abort

index_view = Blueprint('index', __name__)

import logging
logger = logging.getLogger('app')


@index_view.route('/')
def index():
    try:
        return render_template('index.html')
    except Exception as e:
        logger.error('EXCEPTION!')
        abort(404)
