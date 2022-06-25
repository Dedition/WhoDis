from flask import Blueprint, jsonify

server_routes = Blueprint('server', __name__, url_prefix="/servers")


@server_routes.route('/', methods=["GET"])
def all_servers(userId):
    # TODO We need to query the userId to find all the servers they're in
    # TODO Once found, we want to just return it
    pass


@server_routes.route('/', methods=["POST"])
def create_server(user):
    # TODO Check if the session.userId == User.userId (meaning they're logged in)
    # TODO Let them create a server
    # ? The ownerId should automatically attach to the user who creates it
    pass


@server.route('/<int:id>', methods=["GET"])
def get_server_by_id(serverId):
    server = Server.query.get(serverId)
    return jsonify(server)
    pass


@server.route('/<int:id>', methods=["PUT"])
def update_server(serverId):
    # TODO First check it's the server.id == the user.id
    # TODO If that's fine, we want to allow them to PUT the name, banner, server_icon, public status
    # * json_data = request.json
    # * name = json_data["name"]
    # * return "JSON value sent: " + name
    pass


@server.route('/<int:id>', methods=["DELETE"])
def delete_server(id):
    db.session.delete(id)
    pass
