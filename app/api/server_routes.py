from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models.db import Server, db, User, Member
from ..forms.server_form import ServerForm
from app.api.aws_s3_bucket import (
    upload_file_to_s3, allowed_file, get_unique_filename)
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
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            # TODO AWS S3 Bucket Upload Start - banner_url
            banner_url = None
            if request.files:
                image = request.files['banner_url']
                if not allowed_file(image.filename):
                    return {'errors': ['File type not allowed']}, 401
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                if "url" not in upload:
                    return upload, 402
                banner_url = upload['url']
            # TODO AWS S3 Bucket Upload End - banner url

            # TODO AWS S3 Bucket Upload Start - server_icon_url
            server_icon_url = None
            if request.files:
                image = request.files['server_icon_url']
                if not allowed_file(image.filename):
                    return {'errors': ['File type not allowed']}, 403
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                if "url" not in upload:
                    return upload, 404
                server_icon_url = upload['url']

            # TODO AWS S3 Bucket Upload End - server_icon_url
            print(current_user.id, 'dlfkjsdlafjsd;flkasjdf;lkdjfs;dlfjka;dflkja;dfljkasdl;fjkasdfl;sjaf;lasjfl;kasdj')
            server = Server(name=form.data['name'],
                            banner_url=banner_url,
                            server_icon_url=server_icon_url,
                            dm_channel=False,
                            public=False,
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
@login_required
def all_servers():
    # checking for server membership (current_user is a member of server)
    memberships = Member.query.all()
    valid_memberships = [membership.server_id for membership in memberships if membership.user_id == current_user.id]
    servers = []
    for server_ids in valid_memberships:
        if server_ids is not None:
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
           # TODO AWS S3 Bucket Upload Start - banner_url
            banner_url = None
            if request.files:
                image = request.files['banner_url']
                if not allowed_file(image.filename):
                    return {'errors': ['File type not allowed']}, 400
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                if "url" not in upload:
                    return upload, 400
                banner_url = upload['url']
            # TODO AWS S3 Bucket Upload End - banner url

            # TODO AWS S3 Bucket Upload Start - server_icon_url
            server_icon_url = None
            if request.files:
                image = request.files['server_icon_url']
                if not allowed_file(image.filename):
                    return {'errors': ['File type not allowed']}, 400
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                if "url" not in upload:
                    return upload, 400
                server_icon_url = upload['url']

            # TODO AWS S3 Bucket Upload End - server_icon_url
            if (server.owner_id == current_user.id):
                server.name = form.data['name']
                if banner_url:
                    server.banner_url = banner_url
                if server_icon_url:
                    server.server_icon_url = server_icon_url
                server.dm_channel = False
                server.public = False
                server.owner_id = current_user.id
                server.created_at = datetime.utcnow()
                server.updated_at = datetime.utcnow()
                db.session.commit()
                return server.to_dict(), 201
    else:
        return {'errors': error_messages(form.errors)}, 401


# TODO ——————————————————————————————————————————————————————————————————————————————————
# *                                  DELETE
# TODO ——————————————————————————————————————————————————————————————————————————————————

@server_routes.route('/<int:server_id>', methods=['DELETE'])
def delete_server(server_id):
    
    server = Server.query.get(server_id)
    if current_user.id == server.owner_id:
        db.session.delete(server)
        db.session.commit()
    return  server.to_dict()
