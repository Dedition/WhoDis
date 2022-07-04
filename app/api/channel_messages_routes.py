from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models.db import Channel, ChannelMessage, db, User
from ..forms.channel_messages_form import ChannelMessages
from .server_routes import error_messages
from datetime import datetime


channel_messages_routes = Blueprint(
    "channel_messages", __name__, url_prefix="/channel_messages")


# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  CREATE
# TODO ——————————————————————————————————————————————————————————————————————————————————

@channel_messages_routes.route("/<int:channel_id>", methods=["POST"])
@login_required
def create_channel_message(channel_id):
    channel = Channel.query.get(channel_id)
    if not channel:
        return {'errors': f"The user or channel does not exist."}, 404
    else:
        form = ChannelMessages()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            channel_message = ChannelMessage(
                content=form.data['content'], 
                channel_id=channel_id,
                user_id=current_user.id,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow())

            db.session.add(channel_message)
            db.session.commit()
            return channel_message.to_dict()
        else:
            return {'errors': error_messages(form.errors)}, 401


# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  READ
# TODO ——————————————————————————————————————————————————————————————————————————————————

@channel_messages_routes.route('/<int:channel_id>', methods=["GET"])
# def all_channel_messages(channelId):
#     channel_messages = ChannelMessage.query.all().join(
#         Channel).filter(Channel.id == channelId)
def all_channel_messages(channel_id):
    all_channel_messages = ChannelMessage.query.all()
    channel_messages = [
        channel_message for channel_message in all_channel_messages if channel_message.channel_id == channel_id]

    return {'channel_messages': [channel_message.to_dict() for channel_message in channel_messages]}


# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  UPDATE
# TODO ——————————————————————————————————————————————————————————————————————————————————

@channel_messages_routes.route('/<int:channel_message_id>', methods=['PUT'])
@login_required
#! Removed the /update from beginning
def update_channel_messages(channel_message_id):
    channel_message = ChannelMessage.query.get(channel_message_id)
    form = ChannelMessages()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel_message.content = form.data['content']
        channel_message.updated_at = datetime.utcnow()
        db.session.commit()
        return channel_message.to_dict()
    else:
        return {'errors': error_messages(form.errors)}, 401

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  DELETE
# TODO ——————————————————————————————————————————————————————————————————————————————————


@channel_messages_routes.route('/<int:channel_message_id>', methods=['DELETE'])
@login_required
#! Removed the /delete from beginning
def delete_channel_message(channel_message_id):
    channel_message = ChannelMessage.query.get(channel_message_id)
    if current_user.id == channel_message.user_id:
        db.session.delete(channel_message)
        db.session.commit()
        return channel_message.to_dict()
