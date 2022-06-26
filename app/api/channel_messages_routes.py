from flask import Blueprint, request
from flask_login import login_required
from ..models.db import Channel, ChannelMessage, db, User
from ..forms.channel_messages_form import ChannelMessages
from .server_routes import error_messages


channel_messages_routes = Blueprint("channel_messages", __name__)


# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  CREATE
# TODO ——————————————————————————————————————————————————————————————————————————————————

@channel_messages_routes.route("/", methods=["POST"])
@login_required
def create_channel_message(userId):
    user = User.query.get(userId)
    if not user:
        return {'errors': f"No user with id number {userId} exists"}, 404
    else:
        form = ChannelMessage()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            channel_message = ChannelMessage(content=form.data['content'])

            db.session.add(channel_message)
            db.session.commit()
            return channel_message.to_dict(), 201
        else:
            return {'errors': error_messages(form.errors)}, 401


# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  READ
# TODO ——————————————————————————————————————————————————————————————————————————————————

@channel_messages_routes.route('/', methods=["GET"])
def all_channel_messages(channelId):
    channel_messages = ChannelMessage.query.all().join(
        Channel).filter(Channel.id == channelId)
    # channel_msgs_in_channel = [for channel_msg in channel_messages if channel_msg.channel_id == channelId]
    return {'channel_messages': [channel_message.to_dict() for channel_message in channel_messages]}


# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  UPDATE
# TODO ——————————————————————————————————————————————————————————————————————————————————

@channel_messages_routes.route('/<int:channel_message_id>', methods=['PUT'])
def update_channel_messages(channel_message_id):
    channel_message = ChannelMessage.query.get(channel_message_id)
    form = ChannelMessage()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel_message = ChannelMessage(content=form.data['content'])
        db.session.add(channel_message)
        db.session.commit()
        return channel_message.to_dict(), 201
    else:
        return {'errors': error_messages(form.errors)}, 401

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  DELETE
# TODO ——————————————————————————————————————————————————————————————————————————————————


@channel_messages_routes.route('/<int:channel_message_id>', methods=['DELETE'])
def delete_channel_message(channel_message_id):
    channel_message = ChannelMessage.query.get(channel_message_id)
    db.session.delete(channel_message)
    db.session.commit()
    return f"Channel Message {channel_message_id} has been deleted!"
