
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
const updateMessage = (message) => ({ type: UPDATE, message });
const deleteMessage = (messageId) => ({ type: REMOVE, messageId });

// *    ——————————————————————————————————————————————————————————————————————————————————
// *                                    Thunks
// *    ——————————————————————————————————————————————————————————————————————————————————

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 CREATE
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const createChannelMessage = (data) => async (dispatch) => {
    const res = await fetch('/api/channel_messages/', {
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

export const updateMessagem = (channelMessageId, data) => async (dispatch) => {
    const res = await fetch(`/api/channel_messages/${channelMessageId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const updatedMessage = await res.json();
        dispatch(updateMessage(updatedMessage));
        return updatedMessage;
    }
}
