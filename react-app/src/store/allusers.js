const GET_ALL_USERS = 'users/GET_ALL_USERS'

const getUsers = (users) =>( {
    type: GET_ALL_USERS,
    payload: users
})


export const getAllUsers = () => async dispatch => {
   const res = await fetch('/api/users/')

   if (res.ok) {
    const users = await res.json();
    dispatch(getUsers(users));
   }

}


export default function users(state = {}, action) {
    switch(action.type) {
        case GET_ALL_USERS:
           const newState = {...state}
            const users = action.payload.users;
            users.forEach(user => {
                newState[user.id] = user;
            })
            return newState;
        default: 
            return state;
    }
}