import { set } from 'js-cookie';
import { fetch }  from './csrf'



const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'


const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  }
}



export const logout = () => async dispatch => {
  const res = await fetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser())
  return res
}

export const restoreUser = () => async dispatch => {
  const res = await fetch('/api/session');
  dispatch(setUser(res.data.user));
  return res;
}

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, username, email, password }= user;
  console.log(firstName, lastName)
  const res = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
    }),
  })
  dispatch(setUser(res.data.user));
  return res;
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await fetch("/api/session", {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  dispatch(setUser(response.data.user));
  return response;
};



const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
}

export default sessionReducer
