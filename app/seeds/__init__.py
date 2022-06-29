from app.seeds.channel_messages import seed_channels_messages, undo_seed_channels_messages
from app.seeds.channel import seed_channels, undo_seed_channels
from app.seeds.direct_messages import seed_direct_messages, undo_seed_direct_messages
from app.seeds.friends import seed_friends, undo_seed_friend
# from app.seeds.server_users import seed_server_users, undo_seed_server_users
from app.seeds.servers import seed_servers, undo_seed_servers
from app.seeds.dm_server import seed_dm_server, undo_seed_dm_server
from flask.cli import AppGroup
from app.seeds.server_members import seed_members, undo_seed_members

from .users import seed_users, undo_users


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_servers()
    seed_channels()
    seed_channels_messages()
    seed_friends()
    seed_dm_server()
    seed_direct_messages()
    seed_members()
    # seed_server_users()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_seed_servers()
    undo_seed_channels()
    undo_seed_channels_messages()
    undo_seed_friend()
    undo_seed_dm_server()
    undo_seed_direct_messages()
    undo_seed_members()
    # undo_seed_server_users()
