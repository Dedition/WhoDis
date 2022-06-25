from flask import Blueprint, request

users_routes = Blueprint('users', __name__, url_prefix="/users")


@users_routes.route('/<int:id>', methods=["GET"])
def get_users_by_id(id):
    user = User.query.get(id)
# ? If they give authenticator - add here
    pass


@users_routes.route('/<int:id>', methods=["PUT"])
def update_user(id):
    # TODO First check it's the session_user.id == user.id
    # TODO If that's fine, we want to allow them to PUT info
    # ? We may be returning the JSONresponse body AND committing it to the DB
    pass


@users_routes.route('/<int:id>', methods=["DELETE"])
def delete_user(id):
    db.session.delete(id)
    pass
