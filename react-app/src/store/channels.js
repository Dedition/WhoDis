const GET_CHANNELS = 'channels/GET_CHANNELS'
const EDIT_CHANNEL = 'channels/EDIT_CHANNEL'
const REMOVE_CHANNEL = 'channels/REMOVE_CHANNEL'
const ADD_CHANNEL = 'channels/ADD_CHANNEL'
const GET_ONE_CHANNEL = 'notebooks/GET_ONE_CHANNEL'

const addChannel = (channel) => ({
    type: ADD_CHANNEL,
    payload: channel
})


const getChannels = (channels) => ({
    type: GET_CHANNELS,
    payload: channels
})

const editChannel = (channel) => ({
    type: EDIT_CHANNEL,
    payload: channel
})

const removeChannel = (channelId) => ({
    type: REMOVE_CHANNEL,
    payload: channelId
})

const getOneChannel = (channel) => {
    return {
        type: GET_ONE_CHANNEL,
        channel,
    };
};

export const addSingleChannel = (serverId, data) => async dispatch => {
    const res = await fetch(`/api/channels/${serverId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const channel = await res.json()
        dispatch(addChannel(channel))
        return channel
    }
}

// We want to make a request to get all channels that belong to a specific server, this thunk is not accomplishing this at the moment.
export const getAllChannels = (serverId) => async dispatch => {
    const res = await fetch(`/api/channels/${serverId}`)

    if (res.ok) {
        const channels = await res.json();
        dispatch(getChannels(channels))

        return channels;
    }
}


export const editSingleChannel = (channelId, data) => async dispatch => {
    const res = await fetch(`/api/channels/${channelId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const channel = await res.json();
        dispatch(editChannel(channel))
        return channel
    }
}


export const removeSingleChannel = (channelId) => async dispatch => {
    const res = await fetch(`/api/channels/${channelId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const confirmation = await res.json();
        const removedId = confirmation.id
        dispatch(removeChannel(removedId))
        return removedId;
    }
}

export const getChannel = (id) => async dispatch => {
    const response = await fetch(`/api/channels/${id}`)

    if (response.ok) {
        const channel = await response.json();
        dispatch(getOneChannel(channel))
        return response
    }
}

export default function channels(state = {}, action) {
    let newState = {}
    let channel
    switch (action.type) {
        case (ADD_CHANNEL):
            newState = { ...state, [action.payload.id]: action.payload }
            return newState
        case (GET_CHANNELS):
            newState = {}
            let channels = action.payload.channels
            channels.forEach(item => { newState[item.id] = item })
            return newState
        case (EDIT_CHANNEL):
            newState = { ...state };
            channel = action.payload
            newState[channel.id] = channel;
            return newState
        case (REMOVE_CHANNEL):
            newState = {...state};
            delete newState[action.payload]
            return newState
        case GET_ONE_CHANNEL:
             channel = {};
            channel[action.channel.id] = action.channel
            return {
                ...channel
            }         
        default:
            return state
    }
}
