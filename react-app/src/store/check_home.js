const CONFIRM_HOME = 'actions/CONFIRM_HOME'


const confirmUrl = (url) => ({
    type: CONFIRM_HOME,
    url
})



export const confirmUrlAction = (url) => dispatch => {
    return dispatch(confirmUrl(url))
}



export default function globalActions(state = {}, action) {
    let newState;
    switch(action.type) {
        case CONFIRM_HOME:
            newState = {}
            const url = action.url
            console.log(url, "REDUCER GLOBAL ACTIONS ")
            newState['url'] = url
            return newState
        default:
            return state
    }
}