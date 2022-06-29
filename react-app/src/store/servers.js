const GET_SERVERS = 'servers/GET_SERVERS'
const EDIT_SERVER = 'servers/EDIT_SERVER'
const REMOVE_SERVER = 'servers/REMOVE_SERVER'
const ADD_SERVER = 'servers/ADD_SERVER'
const GET_ONE_SERVER = 'notebooks/GET_ONE_SERVER'

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

const getOneServer = (server) => {
    return {
        type: GET_ONE_SERVER,
        server,
    };
};

export const addSingleServer = (payload) => async dispatch => {
    const { name, banner_url, server_icon_url, dm_channel, notPrivate, owner_id} = payload
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

export const getServer = (id) => async dispatch => {
    const response = await fetch(`/api/servers/${id}`)

    if (response.ok) {
        const server = await response.json();
        dispatch(getOneServer(server))
        return response
    }
}


const initialState = {}

export default function servers(state = initialState, action) {
    let newState = { ...state }
    let server;
    switch (action.type) {
        case (ADD_SERVER):
            server = action.payload
            

                 newState = {
                    ...state,
                    [action.payload.id]: server,
                }

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
        case GET_ONE_SERVER:
            const server = {};
            server[action.server.id] = action.server
            return {
                ...server
            } 
        default:
            return state
    }
}
