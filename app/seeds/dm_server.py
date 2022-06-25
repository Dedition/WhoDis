from app.models.db import db, DMServer
from datetime import datetime


def seed_dm_server():
    demo = DMServer(
        user1_id=1,
        user2_id=2,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow())

    test = DMServer(
        user1_id=2,
        user2_id=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow())

    db.session.add(demo)
    db.session.add(test)

    db.session.commit()


def undo_seed_dm_server():
    db.session.execute('TRUNCATE dm_servers RESTART IDENTITY CASCADE;')
    db.session.commit()
