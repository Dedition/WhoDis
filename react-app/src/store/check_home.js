const GET_SERVER_ID = 'actions/GET_SERVER_ID'


const getServerId = (id) => ({
    type: GET_SERVER_ID,
    id
})



export const getSingleServerId = (id) => dispatch => {
     dispatch(getServerId(id))
}



export default function globalActions(state = {}, action) {
    let newState;
    switch(action.type) {
        case GET_SERVER_ID:
            newState = {}
            const serverId = action.id
            newState['serverId'] = serverId
            return newState
        default:
            return state
    }
}
