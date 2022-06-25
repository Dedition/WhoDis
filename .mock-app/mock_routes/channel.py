from flask import Blueprint, request
# from models.db import db

channel_routes = Blueprint(
    'channel', __name__, url_prefix="/channels")


def channel_validations():
    #! Depending on how user validation is done, we may want to implement this
    pass


@channel_routes.route('/', methods=["GET"])
def all_channels(serverId):
    # TODO Here we need to query the server to find all the channels therein
    # * channels = Channel.query.get(Channel.server_id == serverId)
    pass


@channel_routes.route('/', methods=["POST"])
def create_channels():
    # TODO Here we need to first query to see if the server_owner.id is available
    # TODO If the server_owner.id == the session_user.id | To make sure the logged in user is the owner
    # TODO Then we want to allow our POST route to go successfully
    # * db.session.add()
    # * db.session.commit()
    pass


@channel_routes.route('/<int:id>', methods=["GET"])
def get_channel_by_id(id):
    # * Import "Channel" migration class from .db
    channel = Channel.query.get(id)

    #! Alternative method start
    # ? args = request.args
    # ? channelId = args.get("id")
    #! Alternative method end

    # TODO So, if we're in serverId(1), we need to check all the available channels therein
    pass


@channel_routes.route('/<int:id>', methods=["PUT"])
def update_channel(id):
    # TODO First check it's the server_owner.id == the session_user.id
    # TODO If that's fine, we want to allow them to PUT the name
    # * json_data = request.json
    # * server_owner = json_data["server_owner_id"]
    # * name = json_data["name"]
    # * return "JSON value sent: " + server_owner + name
    pass


@channel_routes.route('/<int:id>', methods=["DELETE"])
def delete_channel(id):
    db.session.delete(id)
    pass
