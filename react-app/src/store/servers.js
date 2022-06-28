const GET_SERVERS = 'servers/GET_SERVERS'
const EDIT_SERVER = 'servers/EDIT_SERVER'
const REMOVE_SERVER = 'servers/REMOVE_SERVER'
const ADD_SERVER = 'servers/ADD_SERVER'

const addServer = (server) => ({
    type: ADD_SERVER,
    payload: server
})
const getServers = (servers) => ({
    type: GET_SERVERS,
    payload: servers
})

const editServer = (server) => ({
    type: EDIT_SERVER,
    payload: server
})

const removeServer = (serverId) => ({
    type: REMOVE_SERVER,
    payload: serverId
})


export const addSingleServer = (payload) => async dispatch => {
    const { name, banner_url, server_icon_url, dm_channel, notPrivate, owner_id} = payload
    console.log(payload,",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,")
    const res = await fetch('/api/servers', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name, banner_url, server_icon_url, dm_channel, notPrivate, owner_id
        })
    });

    const server = await res.json()
    dispatch(addServer(server))
    console.log(server, "===============================")
    return server
}

export const getAllServers = () => async dispatch => {
    const res = await fetch('/api/servers')

    if (res.ok) {
        const servers = await res.json();
        dispatch(getServers(servers))

        return servers;
    }
}


export const editSingleServer = (serverId) => async dispatch => {
    const res = await fetch(`/api/servers${serverId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(serverId)
    });
    if (res.ok) {
        const server = await res.json();

        dispatch(editServer(server));
        return server;
    }
}


export const removeSingleServer = (serverId) => async dispatch => {
    const res = await fetch(`/api/servers/${serverId}`, {
        method: 'DELETE',
    })

    if (res.ok) {
        const confirmation = await res.json();
        const removedId = confirmation.id
        dispatch(removeServer(removedId))
        return removedId;
    }
}


const initialState = {}

export default function servers(state = initialState, action) {
    let newState = {...state}
    let server;
    switch (action.type) {
        case (ADD_SERVER):
            server = action.payload
            console.log(action.payload, "'''''''''''''''''''''''''''''''")

                const newState = {
                    ...state,
                    [action.payload.id]: server,
                }
                console.log(newState, "----''")
                return newState
        case (GET_SERVERS):
            const allServers = {};
            let servers = action.payload.servers
            servers.forEach(server => {
                allServers[server.id] = server
            })
            return {
                ...allServers
            }
            // newState = { ...state }
            // let servers = action.payload.servers
            // servers.forEach(item => {
            //     newState[item.id] = item
            // })
        case (EDIT_SERVER):
            newState = { ...state, };
            server = action.payload.server
            newState[server.id] = server;
            return newState
        case (REMOVE_SERVER):
            newState = {
                ...state,
            };
            delete newState[action.payload.serverId]
            return newState
        default:
            return state
    }
}
