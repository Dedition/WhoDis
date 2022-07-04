from flask_socketio import SocketIO, send, emit

socketio = SocketIO(cors_allowed_origins='*')

@socketio.on('chat')
def handleChat(msg):
    emit('chat', msg, broadcast=True)
    return None

@socketio.on('delete')
def handleDelete(channel_msg_id):
    emit('delete', channel_msg_id, broadcast=True)
    return None