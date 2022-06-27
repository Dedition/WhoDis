# form
# form.sender
# form.contend

# person1 == current_user.id , person2 == (when they click on username (or search for their name))


# @direct_message.route('/')
# def create_direct_message(person1_id, person2_username, content)

# current_user.id
# person2_username = User.query.filter(person2_username == form.username)

# person2 = person2_username

# dm_server_exists = DM_Server.query.filter(((user1_id == person1_id) and (user2_id == person2_username))
#                                              or ((user1_id == person2_username) and (user2_id == person1_id)))
# if dm_server_exists == None:
#     # FORM validation for new dm_server
#     dm_server = DM_Server(user1_id=person1_id, user2_id=person2_id)
#     db.session.add(dm_server)
#     db.session.commit()
#     chat_id = dm_server.id

#     direct_message = DirectMessage(sender_id=person1_id, content=content)
#     db.session.add(direct_message)
#     db.session.commit()
# else:
#     # Form validation for existing dm_server
#     exists_chat_id = dm_server_exists.id
#     another_dm = DirectMessage(
#         sender_id=person1_id, content=content, chat_id=exists_chat_id)
