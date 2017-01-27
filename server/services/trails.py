from app import db
from models.trail import Trail


def get_all_trails():
    query = db.session.query(Trail).order_by(Trail.created.desc())
    trails = [{
        'id': result.id,
        'lat': result.lat,
        'lng': result.lng,
        'title': result.title,
        'description': result.description,
        'created': {
            'date': result.created.strftime("%-m/%-j/%Y"),
            'time': result.created.strftime("%-I:%-M%p").lower()
        }
    } for result in query]
    return trails


def create_trail(lat, lng, title, description):
    trail = Trail(
        lat=lat,
        lng=lng,
        title=title,
        description=description)
    db.session.add(trail)
    db.session.commit()
    return trail
