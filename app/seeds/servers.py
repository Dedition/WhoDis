from app.models.db import Server, db
from datetime import datetime


def seed_servers():
    demo = Server(
        name='DemoServer',
        banner_url='https://besthqwallpapers.com/Uploads/18-4-2019/87779/thumb2-blue-grunge-background-dark-blue-grunge-texture-paint-texture-creative-blue-background.jpg',
        server_icon_url='https://images.hdqwalls.com/download/mask-neon-guy-8d-2932x2932.jpg',
        dm_channel=True,
        owner_id=2,
        public=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow())

    test_server = Server(
        name='TestServer',
        banner_url='https://besthqwallpapers.com/Uploads/18-4-2019/87779/thumb2-blue-grunge-background-dark-blue-grunge-texture-paint-texture-creative-blue-background.jpg',
        server_icon_url='https://images.hdqwalls.com/download/mask-neon-guy-8d-2932x2932.jpg',
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
