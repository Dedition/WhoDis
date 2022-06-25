from flask import Blueprint, jsonify

search_routes = Blueprint('search', __name__, url_prefix="/search")


@search_routes.route('/users', method=["GET"])
def search_for_user(names):
    # TODO Search for a user by name
    # users = User.query.get.all()
    users = User.query.filter(User.username.ilike("%{}%").format(name)).all()
    #! Alternative method start
    # ? filtered_users = [user for user in users]
    # ? return filtered_users
    #! Alternative method end
    return jsonify(users)
    pass


@search_routes.route('/servers', method=["GET"])
def search_for_servers(names):
    # TODO Search for a server by name
    servers = Server.query.filter(Server.name.ilike("%{}%").format(name)).all()
    return jsonify(servers)
    pass


@search_routes.route('/channel_message', method=["GET"])
def search_for_channel_messages(content):
    # TODO Search for a server by name
    # TODO Check if the user exists in the server
    # TODO If they do then ---->
    content = ChannelMessage.query.filter(
        ChannelMessage.content.ilike("%{}%").format(content)).all()
    return jsonify(content)
    pass


@search_routes.route('/direct_message', method=["GET"])
def search_for_direct_messages(content):
    # TODO Search for a DM by content
    # TODO Get the messages and check they're not getting all DMs
    content = DirectMessage.query.filter(
        DirectMessage.content.ilike("%{}%").format(content)).all()
    return jsonify(content)
    pass


@search_routes.route('/friend', method=["GET"])
def search_for_friends(friends):
    # TODO Search for a friend by name
    # TODO Find the users id
    # TODO Check to see if the users_id matches with the session_id
    # TODO If so, check if the users.status with {}.format(friend) == True
    # TODO Return jsonify(friends)
    pass
