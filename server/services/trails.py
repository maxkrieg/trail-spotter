from app import db
from models.trail import Trail


def get_all_trails():
    query = db.session.query(Trail).order_by(Trail.created.desc())
    trails = [format_trail(result) for result in query]
    return trails


def create_trail(lat, lng, title, description):
    trail = Trail(
        lat=lat,
        lng=lng,
        title=title,
        description=description)
    db.session.add(trail)
    db.session.commit()
    return format_trail(trail)


def format_trail(trail):
    return {
        'id': trail.id,
        'lat': trail.lat,
        'lng': trail.lng,
        'title': trail.title,
        'description': trail.description,
        'created': {
            'date': trail.created.strftime("%-m/%-j/%Y"),
            'time': trail.created.strftime("%-I:%-M%p").lower()
        }
    }
