from app.models.db import db, Friend
from datetime import datetime


def seed_friends():
    demo1 = Friend(
        status=True,
        user1_id=1,
        user2_id=2,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )

    demo2 = Friend(
        status=False,
        user1_id=2,
        user2_id=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )

    db.session.add(demo1)
    db.session.add(demo2)

    db.session.commit()


def undo_seed_friend():
    db.session.execute('TRUNCATE friends RESTART IDENTITY CASCADE;')
    db.session.commit()
