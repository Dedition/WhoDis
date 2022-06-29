from app.models.db import db, Member 


def seed_members():
    membership1 = Member(user_id=1, server_id=1)
    membership2 = Member(user_id=1, server_id=2)
    membership3 = Member(user_id=2, server_id=1)
    membership4 = Member(user_id=2, server_id=2)


    db.session.add(membership1)
    db.session.add(membership2)
    db.session.add(membership3)
    db.session.add(membership4)

    db.session.commit()

def undo_seed_members():
        db.session.execute('TRUNCATE members RESTART IDENTITY CASCADE;')
        db.session.commit()