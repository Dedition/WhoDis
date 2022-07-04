const GET_SERVER_ID = 'actions/GET_SERVER_ID'
const HOME_CLICKED = 'actions/HOME_CLICKED'
const USER_PAGE = 'actions/USER_PAGE'
const GET_CHANNEL = 'actions/GET_CHANNEL'

const getServerId = (id) => ({
    type: GET_SERVER_ID,
    id
})
const homeClicked = (bool) => ({
    type: HOME_CLICKED,
    bool
})
const userPage = (url) => ({
    type: USER_PAGE,
    url
}) 

const getAChannel = (channel) => ({
    type: GET_CHANNEL,
    channel
})

export const getSingleServerId = (id) => dispatch => {
    dispatch(getServerId(id))
}

export const setHomeClicked = (bool) => dispatch => {
    dispatch(homeClicked(bool))
}

export const checkPath = (url) => dispatch => {
    dispatch(userPage(url))

}

export const getSingleChannel = (id) => async dispatch => {
    const response = await fetch(`/api/channels/${id}`)

    if (response.ok) {
        const channel = await response.json();
        dispatch(getAChannel(channel))
        return response
    }
}

export default function globalActions(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_SERVER_ID:
            newState = {}
            const serverId = action.id
            newState['serverId'] = serverId
            return newState
        case HOME_CLICKED:
            newState = {}
            const bool = action.bool
            newState['showDms'] = bool
            return newState
        case USER_PAGE:
            newState = {}
            const url = action.url
            newState['url'] = url
            return newState
        case GET_CHANNEL:
            newState = {}
            const channel = action.channel
            newState['channel'] = channel
            return newState
        default:
            return state
    }
}
