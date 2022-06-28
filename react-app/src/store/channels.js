const GET_CHANNELS = 'channels/GET_CHANNELS'
const EDIT_CHANNEL = 'channels/EDIT_CHANNEL'
const REMOVE_CHANNEL = 'channels/REMOVE_CHANNEL'
const ADD_CHANNEL = 'channels/ADD_CHANNEL'



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


export const addSingleChannel = (channel, data) => async dispatch => {
    const res = await fetch(`/api/channels`, {
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
    const res = await fetch(`/api/channels${channelId}`, {
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

export default function channelReducer(state = {}, action) {
    let newState = {}
    let channel;
    switch (action.type) {
        case (ADD_CHANNEL):
            channel = action.payload.channel
            newState = { ...state, [channel.id]: channel, }
            return newState
        case (GET_CHANNELS):
            newState = { ...state }
            let channels = action.payload.channels
            channels.forEach(item => { newState[item.id] = item })
            return newState
        case (EDIT_CHANNEL):
            newState = { ...state };
            channel = action.payload.channel
            newState[channel.id] = channel;
            return newState
        case (REMOVE_CHANNEL):
            newState = { ...state, };
            delete newState[action.payload.channelId]
            return newState
        default:
            return state
    }
}