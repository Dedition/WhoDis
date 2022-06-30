from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models.db import Server, db, User, Member
from ..forms.server_form import ServerForm
from datetime import datetime

server_routes = Blueprint('servers', __name__)


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


@server_routes.route('', methods=["POST"])
@login_required
def create_server():
        form = ServerForm()
        print(form.data, "_______________________________________")
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            server = Server(name=form.data['name'],
                            banner_url=form.data['banner_url'],
                            server_icon_url=form.data['server_icon_url'],
                            dm_channel=False,
                            public=form.data['public'],
                            owner_id=current_user.id,
                            created_at=datetime.utcnow(),
                            updated_at=datetime.utcnow()
                            )

            db.session.add(server)
            db.session.commit()
            return server.to_dict()
        else:
            return {'errors': error_messages(form.errors)}, 401

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                   READ
# TODO ——————————————————————————————————————————————————————————————————————————————————


@server_routes.route('', methods=["GET"])
def all_servers():
    # * This query returns a non-Pythonic list of all servers
    # user_id = current_user.id
    # print(user_id, '---------------------------------')
    memberships = Member.query.all()
    valid_memberships = [membership.server_id for membership in memberships if membership.user_id == current_user.id]

    servers = []
    for server_ids in valid_memberships:
        each_server = Server.query.get(server_ids)
        servers.append(each_server)

    # need to check ownership of server
    all_servers = Server.query.all()
    for server in all_servers:
        if server.owner_id == current_user.id:
            servers.append(server)

    # * This returns a key/val pair of servers in JSON format
    return { 'servers': [server.to_dict() for server in servers] }

# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  UPDATE
# TODO ——————————————————————————————————————————————————————————————————————————————————


@server_routes.route('/<int:server_id>', methods=["PUT"])
def update_server(server_id):
    server = Server.query.get(server_id)

    if server:
        form = ServerForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            if (server.owner_id == current_user.id):
                server.name = form.data['name']
                server.banner_url = form.data['banner_url']
                server.server_icon_url = form.data['server_icon_url']
                server.dm_channel=form.data['dm_channel']
                server.public=form.data['public']
                server.owner_id = form.data['owner_id']
                server.created_at = datetime.utcnow()
                server.updated_at=datetime.utcnow()
                db.session.commit()
                return server.to_dict(), 201
    else:
        return {'errors': error_messages(form.errors)}


# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  DELETE
# TODO ——————————————————————————————————————————————————————————————————————————————————

@server_routes.route('/<int:server_id>', methods=['DELETE'])
def delete_server(server_id):
    
    server = Server.query.get(server_id)
    if current_user.id == server.owner_id:
        db.session.delete(server)
        db.session.commit()
    return server.to_dict()
