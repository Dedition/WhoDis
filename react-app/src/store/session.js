// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const EDIT_USER = 'session/EDIT_USER';
const GET_USERS = 'session/GET_USERS';


const setUser = (user) => ({
  type: SET_USER,
  payload: user
});
const removeUser = () => ({
  type: REMOVE_USER,
})
const editUser = (user) => ({
  type: EDIT_USER,
  payload: user
})

const getAllUsers = (users) => ({
  type: GET_USERS,
  payload: users
})


const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(setUser(data));
  }
}
export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}
export const editSingleUser = (userId, data) => async dispatch => {
  const res = await fetch(`/api/users/edit/${userId}`, {
    method: 'PUT',
    body: data
  });
  if (res.ok) {
    const user = await res.json();
    dispatch(editUser(user));
    return user;
  }
}
export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (response.ok) {
    dispatch(removeUser());
  }
};
export const signUp = (formData) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: formData
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const removeSingleUser = (userId) => async dispatch => {
  const res = await fetch(`/api/users/delete/${userId}`, {
    method: 'DELETE',
  })

  if (res.ok) {
    const confirmation = await res.json();
    const removedId = confirmation.id
    dispatch(removeUser(removedId))
    return removedId;
  }
}

export const getUsers = () => async dispatch => {
  const res = await fetch('/api/users/all', {
    method: 'GET',
  })

  if (res.ok) {
    const users = await res.json();
    dispatch(getAllUsers(users))
    return users;
  }
}



// Demo Thunk for Demo  Login -- Sona 
export const demo = (email, password) => async (dispatch) => {
  email = "demo@aa.io";
  password = "password";
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data))
  return response;
}
export default function reducer(state = initialState, action) {
  let newState = { ...state }
  let user;
  let users;
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case (EDIT_USER):
      // newState = Object.assign({}, state, { user: action.user });
      // return newState;
      // newState = {...state};
      newState = {};
      user = action.payload
      newState[user.id] = user;
      return newState
    case (REMOVE_USER):
      newState = {
        ...state,
      };
      delete newState[action.payload.userId]
      return newState
    case (GET_USERS):
      newState = {}
      users = action.payload.users
      users.forEach(user => {
        newState[user.id] = user;
      })
      return newState
    default:
      return state;
  }
}
