from app.models.db import Channel, db
from datetime import datetime


def seed_channels():
    demo = Channel(
        name='DemoChannel',
        server_id=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow())

    test_channel = Channel(
        name='TestChannel',
        server_id=2,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow())

    db.session.add(demo)
    db.session.add(test_channel)

    db.session.commit()


def undo_seed_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
