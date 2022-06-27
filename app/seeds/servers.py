from app.models.db import Server, db
from datetime import datetime


def seed_servers():
    demo = Server(
        name='DemoServer',
        banner_url='https://i.imgur.com/XqQXQ.png',
        server_icon_url='https://i.imgur.com/XqQXQ.png',
        dm_channel=True,
        owner_id=2,
        public=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow())

    test_server = Server(
        name='TestServer',
        banner_url='https://i.imgur.com/XqQXQ.png',
        server_icon_url='https://i.imgur.com/XqQXQ.png',
        dm_channel=False,
        owner_id=1,
        public=False,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow())

    db.session.add(demo)
    db.session.add(test_server)

    db.session.commit()


def undo_seed_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
