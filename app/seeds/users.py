from app.models import db, User
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        bio='Hello World',
        profile_pic_url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.97DZXrgElDEjesXTId8mQwHaE8%26pid%3DApi&f=1',
        password='password',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow())

    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        bio='Hello World',
        profile_pic_url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.97DZXrgElDEjesXTId8mQwHaE8%26pid%3DApi&f=1',
        password='password',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow())

    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        bio='Hello World',
        profile_pic_url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.97DZXrgElDEjesXTId8mQwHaE8%26pid%3DApi&f=1',
        password='password',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow())

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
