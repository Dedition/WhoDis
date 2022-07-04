from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


db = SQLAlchemy()


#! JOIN TABLE START
# server_users = db.Table(
#     "server_users",
#     db.Model.metadata,  # ! db.Base.metadata
#     db.Column("user_id", db.ForeignKey("users.id")),
#     db.Column("server_id", db.ForeignKey("servers.id"))
# )
#! JOIN TABLE END








class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    bio = db.Column(db.String(180), nullable=True)
    profile_pic_url = db.Column(db.String, nullable=True)
    hashed_password = db.Column(db.String, nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=False))
    updated_at = db.Column(db.TIMESTAMP(timezone=False))
    # * Database relationship

    # MEMBERS TABLE RELATIONSHIPS 
    members = db.relationship('Member', back_populates='users', foreign_keys='Member.user_id')
    # MEMBERS TABLE RELATIONSHIPS


    server_owners = db.relationship(
        'Server', back_populates="user_owner", cascade="all, delete")
    channel_messages = db.relationship(
        'ChannelMessage', back_populates='users', cascade="all, delete")
    # dm_server = db.relationship(
    #     'DMServer', back_populates='users_1', cascade="all, delete")
    # dm_server = db.relationship(
    #     'DMServer', back_populates='users_2', cascade="all, delete")
    dm_server1 = db.relationship(
        'DMServer', back_populates='users_1', cascade="all, delete", foreign_keys='DMServer.user1_id')
    dm_server2 = db.relationship(
        'DMServer', back_populates='users_2', cascade="all, delete", foreign_keys='DMServer.user2_id')
    direct_messages = db.relationship(
        'DirectMessage', back_populates='users', cascade="all, delete")
    friend_1 = db.relationship(
        'Friend', back_populates='user_1', cascade="all, delete", foreign_keys='Friend.user1_id')
    friend_2 = db.relationship(
        'Friend', back_populates='user_2', cascade="all, delete", foreign_keys='Friend.user2_id')

    @ property
    def password(self):
        return self.hashed_password

    @ password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'profile_pic_url': self.profile_pic_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
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

    # Members Table Relationship
    members_servers = db.relationship(
        'Member', back_populates="servers", foreign_keys='Member.server_id')
    # Members Table Relationship

    user_owner = db.relationship(
        'User', back_populates="server_owners")
    channels = db.relationship(
        'Channel', back_populates="server", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'banner_url': self.banner_url,
            'server_icon_url': self.server_icon_url,
            'dm_channel': self.dm_channel,
            'owner_id': self.owner_id,
            'public': self.public,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }



class Member(db.Model): 
    __tablename__ = 'members'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'))
    
    users = db.relationship('User', back_populates='members')
    servers = db.relationship('Server', back_populates='members_servers', cascade='all, delete')

    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        'server_id': self.server_id
        }






class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey(
        "servers.id"), nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    updated_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    # * Database relationship
    server = db.relationship('Server', back_populates="channels")
    channel_messages = db.relationship(
        'ChannelMessage', back_populates='channels', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'server_id': self.server_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }


class ChannelMessage(db.Model):
    __tablename__ = 'channel_messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        "channels.id"), nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    updated_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    # * Database relationship
    channels = db.relationship('Channel', back_populates='channel_messages', foreign_keys='ChannelMessage.channel_id')
    users = db.relationship('User', back_populates='channel_messages', foreign_keys='ChannelMessage.user_id')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'content': self.content,
            'channel_id': self.channel_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }


class DMServer(db.Model):
    __tablename__ = 'dm_servers'

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    updated_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    # * Database relationship
    users_1 = db.relationship(
        'User', back_populates='dm_server1', foreign_keys='DMServer.user1_id')
    #! We may not need a second one
    users_2 = db.relationship(
        'User', back_populates='dm_server2', foreign_keys='DMServer.user2_id')
    direct_messages = db.relationship(
        'DirectMessage', back_populates='dm_servers', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user1_id': self.user1_id,
            'user2_id': self.user2_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }


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
    # * Database relationship
    dm_servers = db.relationship('DMServer', back_populates='direct_messages')
    users = db.relationship('User', back_populates='direct_messages')

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'chat_id': self.chat_id,
            'content': self.content,
            'time_sent': self.time_sent,
            'time_edited': self.time_edited
        }


class Friend(db.Model):
    __tablename__ = "friends"

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.Boolean, default=False)
    user1_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    updated_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    # * Database relationship
    user_1 = db.relationship(
        'User', back_populates="friend_1", foreign_keys='Friend.user1_id')
    user_2 = db.relationship(
        'User', back_populates="friend_2", foreign_keys='Friend.user2_id')

    def to_dict(self):
        return {
            'id': self.id,
            'status': self.status,
            'user1_id': self.user1_id,
            'user2_id': self.user2_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
