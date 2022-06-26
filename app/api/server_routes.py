from flask import Blueprint, jsonify
from ..models.db import Server, db

server_routes = Blueprint('server', __name__, url_prefix="/servers")


@server_routes.route('/', methods=["GET"])
def all_servers():
    servers = Server.query.all()
    return {'servers': [server.to_dict() for server in servers]}
