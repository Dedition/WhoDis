
// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 Action
// TODO ——————————————————————————————————————————————————————————————————————————————————

const ADD = "CHANNEL_MESSAGES/ADD";
const LOAD = "CHANNEL_MESSAGES/LOAD";
const UPDATE = "CHANNEL_MESSAGES/UPDATE";
const REMOVE = "CHANNEL_MESSAGES/REMOVE";

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 Action Creators
// TODO ——————————————————————————————————————————————————————————————————————————————————

const addMessage = (message) => ({ type: ADD, message });
const loadMessages = (messages) => ({ type: LOAD, messages });
const updateMyMessage = (message) => ({ type: UPDATE, message });
const deleteMyMessage = (messageId) => ({ type: REMOVE, messageId });

// *    ——————————————————————————————————————————————————————————————————————————————————
// *                                    Thunks
// *    ——————————————————————————————————————————————————————————————————————————————————

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 CREATE
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const createChannelMessage = (channelId, data) => async (dispatch) => {
    const res = await fetch(`/api/channel_messages/${channelId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const channelMessage = await res.json();
        dispatch(addMessage(channelMessage));
        return channelMessage;
    };
}

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 READ
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const getChannelMessages = (channelId) => async (dispatch) => {
    const res = await fetch(`/api/channel_messages/${channelId}`);

    if (res.ok) {
        const channel_messages = await res.json();
        dispatch(loadMessages(channel_messages));
        return channel_messages;
    }
}


// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 UPDATE
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const updateMessage = (channelMessageId, data) => async (dispatch) => {

    const res = await fetch(`/api/channel_messages/${channelMessageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const updatedMessage = await res.json();
        dispatch(updateMyMessage(updatedMessage));
        return updatedMessage;
    };
}


// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 DELETE
// TODO ——————————————————————————————————————————————————————————————————————————————————


export const deleteMessage = (channelMessageId) => async (dispatch) => {
    const res = await fetch(`/api/channel_messages/${channelMessageId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const channelMessageId = await res.json()
        dispatch(deleteMyMessage(channelMessageId))
    };
}


// * ——————————————————————————————————————————————————————————————————————————————————
// *                                    Reducer
// * ——————————————————————————————————————————————————————————————————————————————————

const initialState = {}

export default function channelMessages(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD:
            newState = {...state}
            const newMessage = action.message;
            newState[newMessage.id] = newMessage;
            return newState;
        case LOAD:
            const allMessages = {}
            const messages = action.messages.channel_messages;
            messages.forEach((msgObj) => {
                allMessages[msgObj.id] = msgObj
            })
            return { ...allMessages }
        case UPDATE:
            newState = { ...state };
            const message = action.message;
            newState[message.id] = message;
            return newState;
        case REMOVE:
            newState = { ...state };
            delete newState[action.messageId.id];
            return newState;
        default:
            return state;
    }
}
