from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models.db import db, User, Channel, Server
from ..forms.channel_form import ChannelForm
from .server_routes import error_messages
from datetime import datetime
channel_routes = Blueprint('channel', __name__, url_prefix="/channels")

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  CREATE
# TODO ——————————————————————————————————————————————————————————————————————————————————


@channel_routes.route('/<int:serverId>', methods=["POST"])
def create_channel(serverId):
    # user = User.query.get(userId)
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel = Channel(name=form.data['name'], server_id=serverId, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict(), 201
    else:
        return {'errors': error_messages(form.errors)}, 401

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                   READ
# TODO ——————————————————————————————————————————————————————————————————————————————————

# The reason we include a server_id parameter,
# is so that we only get the channels that belong to a specific server.


@channel_routes.route('/<int:server_id>', methods=["GET"])
def all_channels(server_id):
    channels = Channel.query.filter_by(server_id=server_id)
    return {'channels': [channel.to_dict() for channel in channels]}

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  UPDATE
# TODO ——————————————————————————————————————————————————————————————————————————————————


@channel_routes.route('/<int:channel_id>', methods=['PUT'])
@login_required
def update_channel(channelId):
    params = request.get_json()
    server_id = params['server_id']

    server = Server.query.get(server_id)
    channel = Channel.query.get(channelId)
    if not channel:
        return {'errors': f"No channel with id number {channelId} exists"}, 404
    elif (server.owner_id == current_user.id) and (channel):
        form = ChannelForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            channel = Channel(name=form.data['name'])
            db.session.commit()
            return channel.to_dict(), 201
        else:
            return {'errors': error_messages(form.errors)}, 401


# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  DELETE
# TODO ——————————————————————————————————————————————————————————————————————————————————

@channel_routes.route('/<int:channel_id>', methods=['DELETE'])
def delete_channel(channelId):

    channel = Channel.query.get(channelId)
    if channel:
        server_id = channel.server_id
        server = Server.query.get(server_id)
        if server.owner_id == current_user.id:
            db.session.delete(channel)
            db.session.commit()
            return channel.to_dict()
    return f"channel {channelId} has been deleted!"
