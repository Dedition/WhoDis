from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models.db import Channel, ChannelMessage, db, User
from ..forms.channel_messages_form import ChannelMessages
from .server_routes import error_messages


channel_messages_routes = Blueprint(
    "channel_messages", __name__, url_prefix="/channel_messages")


# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  CREATE
# TODO ——————————————————————————————————————————————————————————————————————————————————

@channel_messages_routes.route("/", methods=["POST"])
@login_required
def create_channel_message():
    params = request.get_json()
    sender_id = params["senderId"]
    channel_id = params["channelId"]
    user = User.query.get(sender_id)
    channel = Channel.query.get(channel_id)
    if not user and channel:
        return {'errors': f"The user or channel does not exist."}, 404
    else:
        form = ChannelMessages()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            #! If there's an error, double check here
            channel_id = channel.id
            user_id = user.id
            #! ^
            channel_message = ChannelMessage(
                content=form.data['content'], channel_id=channel_id, user_id=user_id)

            db.session.add(channel_message)
            db.session.commit()
            return channel_message.to_dict(), 201
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
    #! Please work
    channel_messages = ChannelMessage.query.filter(
        ChannelMessage.channel_id == channel_id).all()
    # channel_msgs_in_channel = [for channel_msg in channel_messages if channel_msg.channel_id == channelId]
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
    if form.validate_on_submit() and current_user.id == channel_message.user_id:
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
@login_required
#! Removed the /delete from beginning
def delete_channel_message(channel_message_id):
    channel_message = ChannelMessage.query.get(channel_message_id)
    if current_user.id == channel_message.user_id:
        db.session.delete(channel_message)
        db.session.commit()
        return f"Channel Message {channel_message_id} has been deleted!"
