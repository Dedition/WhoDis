from app.seeds.channel import seed_channels, undo_seed_channels
from app.seeds.servers import seed_servers, undo_seed_servers
from flask.cli import AppGroup
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


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_seed_servers()
    undo_seed_channels()
