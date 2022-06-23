from flask import Blueprint

channel_routes = Blueprint(
    'channel', __name__, url_prefix="/channels")


def channel_validations():
    #! Depending on how user validation is done, we may want to implement this
    pass


@channel_routes.route('/', methods=["GET"])
def all_channels():
    # TODO Here we need to query the server to find all the channels therein
    pass


@channel_routes.route('/', methods=["POST"])
def create_channels():
    # TODO Here we need to first query to see if the server_owner.id is available
    # TODO If the server_owner.id == the session_user.id | To make sure the logged in user is the owner
    # TODO Then we want to allow our POST route to go successfully
    pass


@channel_routes.route('/<int:id>', methods=['GET'])
def get_channel_by_id(id):
    # TODO Here
