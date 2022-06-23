from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String, nullable=False)
    profile_pic_url = db.Column(db.String, nullable=True)
    created_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    updated_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)

    @staticmethod
    def generate_password_hash():
        # TODO Create a method that generates a hashed password

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)
        pass

    def check_password(self, password):
        return check_password_hash(self.password, password)
        pass


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    banner_url = db.Column(db.String, nullable=True)
    server_icon_url = db.Column(db.String, nullable=True)
    dm_channel = db.Column(db.Boolean, nullable=True)
    owner_id = db.Column(db.Integer, nullable=True)
    public = db.Column(db.Boolean, nullable=True)
    created_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    updated_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)

#! JOIN TABLE
server_users = db.Table(
    "server_users",
    db.Model.metadata,  # db.Base.metadata
    db.Column("user_id", db.ForeignKey("users.id"), primary_key=True),
    db.Column("server_id", db.ForeignKey("servers.id"), primary_key=True)
)
