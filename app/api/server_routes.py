from distutils.log import error
from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from ..models.db import Server, db, User
from ..forms import ServerForm

server_routes = Blueprint('server', __name__, url_prefix="/servers")


# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  ValidationErrors
# TODO ——————————————————————————————————————————————————————————————————————————————————

def error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for err in validation_errors[field]:
            errorMessages.append(f'{field}: {err}')
    return errorMessages


# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  CREATE
# TODO ——————————————————————————————————————————————————————————————————————————————————


@server_routes.route('/', methods=["POST"])
@login_required
def create_server(userId):
    user = User.query.get(userId)
    if not user:
        return {'errors': f"No user with id number {userId} exists"}, 404
    else:
        form = ServerForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            server = Server(name=form.data['name'],
                            banner_url=form.data['banner_url'],
                            server_icon_url=form.data['server_icon_url'],
                            dm_channel=form.data['dm_channel'],
                            public=form.data['public'])

            db.session.add(server)
            db.session.commit()
            return server.to_dict(), 201
        else:
            return {'errors': error_messages(form.errors)}, 401

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                   READ
# TODO ——————————————————————————————————————————————————————————————————————————————————


@server_routes.route('/', methods=["GET"])
def all_servers():
    # * This query returns a non-Pythonic list of all servers
    servers = Server.query.all()
    # * This returns a key/val pair of servers in JSON format
    return {'servers': [server.to_dict() for server in servers]}


# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  UPDATE
# TODO ——————————————————————————————————————————————————————————————————————————————————


@server_routes.route('/<int:server_id>', methods=['PUT'])
@login_required
def update_server(serverId, userId):
    server = Server.query.get(serverId)
    if not server:
        return {'errors': f"No server with id number {serverId} exists"}, 404
    else:
        form = ServerForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            server = Server(name=form.data['name'],
                            banner_url=form.data['banner_url'],
                            server_icon_url=form.data['server_icon_url'],
                            dm_channel=form.data['dm_channel'],
                            public=form.data['public'])
            db.session.commit()
            return server.to_dict(), 201
        else:
            return {'errors': error_messages(form.errors)}, 401


# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  DELETE
# TODO ——————————————————————————————————————————————————————————————————————————————————

@server_routes.route('/<int:server_id>', methods=['DELETE'])
def delete_server(serverId):
    server = Server.query.get(serverId)
    db.session.delete(server)
    db.session.commit()
    return f"Server {serverId} has been deleted!"
