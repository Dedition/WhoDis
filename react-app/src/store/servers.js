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

export const addSingleServer = (data) => async dispatch => {
    
    const res = await fetch('/api/servers', {
        method: "POST",
        body: data
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


export const editSingleServer = (serverId, data) => async dispatch => {
    const res = await fetch(`/api/servers/${serverId}`, {
        method: 'PUT',
        body: data
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
            newState = { ...state, [action.payload.id]: action.payload }

            return newState
        case (GET_SERVERS):
             newState = {};
            let servers = action.payload.servers
            servers.forEach(server => {
                newState[server.id] = server
            })
            return newState
        case (EDIT_SERVER):
            newState = {...state};
            server = action.payload
            newState[server.id] = server;
            return newState
        case (REMOVE_SERVER):
            newState = {...state};
            const serverId = action.payload
            delete newState[serverId]
            return newState
        case GET_ONE_SERVER:
             server = {};
            server[action.server.id] = action.server
            return {
                ...server
            }
        default:
            return state
    }
}
