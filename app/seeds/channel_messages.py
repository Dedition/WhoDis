from app.models.db import db, ChannelMessage
from datetime import datetime


def seed_channels_messages():
    demo = ChannelMessage(
        user_id=1,
        content='This is a demo channel.',
        channel_id=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow())

    test_channel = ChannelMessage(
        user_id=2,
        content='This is a test channel.',
        channel_id=2,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow())

    db.session.add(demo)
    db.session.add(test_channel)

    db.session.commit()


def undo_seed_channels_messages():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
