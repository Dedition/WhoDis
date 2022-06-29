# from app.models.db import db, server_users
# from datetime import datetime


# def seed_server_users():
#     demo = server_users.insert().values(user_id=1,
#                                         server_id=1)

#     test = server_users.insert().values(user_id=2,
#                                         server_id=1)


# #! When mapping a join table to the db, you need to use the 'execute' method.
# #! This method takes a SQLAlchemy query object and executes it.

#     db.session.execute(demo)
#     db.session.execute(test)

#     db.session.commit()


# def undo_seed_server_users():
#     db.session.execute('TRUNCATE server_users RESTART IDENTITY CASCADE;')
#     db.session.commit()
