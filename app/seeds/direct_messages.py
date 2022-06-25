from app.models.db import db, DirectMessage
from datetime import datetime


def seed_direct_messages():
    demo = DirectMessage(
        sender_id=1,
        chat_id=1,
        content='This is a demo direct message.',
        time_sent=datetime.utcnow(),
        time_edited=datetime.utcnow())

    test = DirectMessage(
        sender_id=2,
        chat_id=2,
        content='This is a test direct message.',
        time_sent=datetime.utcnow(),
        time_edited=datetime.utcnow())

    db.session.add(demo)
    db.session.add(test)

    db.session.commit()


def undo_seed_direct_messages():
    db.session.execute('TRUNCATE direct_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
