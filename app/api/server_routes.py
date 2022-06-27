from flask import Blueprint, jsonify

server_routes = Blueprint('server', __name__, url_prefix="/servers")


@server_routes.route('/', methods=["GET"])
def all_servers():
