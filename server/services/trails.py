from app import db
from models.trail import Trail
from schemas.trail import trail_schema
from schemas.trail import trails_schema


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
