from app import db
from models.trail import Trail


def get_all_trails():
    query = db.session.query(Trail).order_by(Trail.created.desc())
    trails = [format_trail(result) for result in query]
    return trails


def create_trail(path, title, description):
    trail = Trail(
        path=path,
        title=title,
        description=description
    )
    db.session.add(trail)
    db.session.commit()
    return format_trail(trail)


def format_trail(trail):
    return {
        'id': trail.id,
        'path': trail.path,
        'title': trail.title,
        'description': trail.description,
        'created': {
            'date': trail.created.strftime("%-m/%-j/%Y"),
            'time': trail.created.strftime("%-I:%-M%p").lower()
        }
    }
