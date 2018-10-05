from server.db import db
from server.models.trail import Trail
from server.schemas.trail import trail_schema
from server.schemas.trail import trails_schema
from pprint import pprint


def get_all_trails():
    query = db.session.query(Trail).order_by(Trail.created.desc())
    result = trails_schema.dump(query)
    return result.data


def create_trail(json_data):
    data, errors = trail_schema.load(json_data)
    if errors:
        raise ValueError('Bad trail data in JSON!')

    trail = Trail(**data)
    db.session.add(trail)
    db.session.commit()

    result = trail_schema.dump(trail)
    return result.data


def get_trail_information(trail_id):
    query = db.session.query(
        Trail.created,
        Trail.title,
        Trail.description
    ).filter(Trail.id == trail_id)
    trail = query.one()
    return {
        'created': str(trail.created),
        'title': trail.title,
        'description': trail.description
    }