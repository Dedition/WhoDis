from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


db = SQLAlchemy()

#! JOIN TABLE START
server_users = db.Table(
    "server_users",
    db.Model.metadata,  # ! db.Base.metadata
    db.Column("user_id", db.ForeignKey("users.id"), primary_key=True),
    db.Column("server_id", db.ForeignKey("servers.id"), primary_key=True)
)
#! JOIN TABLE END


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    banner_url = db.Column(db.String, nullable=True)
    server_icon_url = db.Column(db.String, nullable=True)
    # ! We don't need 'nullable=False' here because we are using the default value
    dm_channel = db.Column(db.Boolean, default=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=True, )
    public = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    updated_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    # * Database relationship
    users = db.relationship(
        'User', secondary=server_users, back_populates="servers", lazy=True)
    user_owner = db.relationship(
        'User', back_populates="server_owners", lazy=True)
    channels = db.relationship(
        'Channel', back_populates="server", lazy=True, cascade="all, delete")


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey(
        "servers.id"), nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    updated_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    # * Database relationship
    server = db.relationship(
        'Server', back_populates="channels", lazy=True)


class ChannelMessage(db.Model):
    __tablename__ = 'channel_messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        "channel.id"), nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    updated_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)


class DMServer(db.Model):
    __tablename__ = 'dm_servers'

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    updated_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)


class DirectMessage(db.Model):
    __tablename__ = "direct_messages"

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False)
    chat_id = db.Column(db.Integer, db.ForeignKey(
        "dm_servers.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    time_sent = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    time_edited = db.Column(db.TIMESTAMP(timezone=False), nullable=False)


class Friends(db.Model):
    __tablename__ = "friends"

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.Boolean, default=False)
    user1_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    updated_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
