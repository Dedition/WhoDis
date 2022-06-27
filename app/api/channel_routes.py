from flask import Blueprint, request
from flask_login import login_required
from ..models.db import db, User, Channel
from ..forms.channel_form import ChannelForm
from .server_routes import error_messages

channel_routes = Blueprint('channel', __name__, url_prefix="/channels")

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  CREATE
# TODO ——————————————————————————————————————————————————————————————————————————————————


@channel_routes('/', methods=["POST"])
def create_channel(userId):
    user = User.query.get(userId)
    if not user:
        return {'errors': f"No user with id number {userId} exists"}, 404
    else:
        form = ChannelForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            channel = Channel(name=form.data['name'])
            db.session.add(channel)
            db.session.commit()
            return channel.to_dict(), 201
        else:
            return {'errors': error_messages(form.errors)}, 401

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                   READ
# TODO ——————————————————————————————————————————————————————————————————————————————————


@channel_routes.route('/', methods=["GET"])
def all_channels(channelId):
    # * This query returns a non-Pythonic list of all channels
    channels = Channel.query.all()
    # * This returns a key/val pair of channels in JSON format
    return {'channels': [channel.to_dict() for channel in channels]}

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  UPDATE
# TODO ——————————————————————————————————————————————————————————————————————————————————


@channel_routes.route('/<int:channel_id>', methods=['PUT'])
@login_required
def update_channel(channelId, userId):
    channel = Channel.query.get(channelId)
    if not channel:
        return {'errors': f"No channel with id number {channelId} exists"}, 404
    else:
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
    db.session.delete(channel)
    db.session.commit()
    return f"channel {channelId} has been deleted!"
