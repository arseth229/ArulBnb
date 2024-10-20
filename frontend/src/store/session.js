import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    };
};

export const login = (user) => async (dispatch) => {
    const {credential, password} = user
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: "DELETE"
    })
    dispatch(removeUser());
    return response;
}

const initialState = {user: null};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.payload};
        case REMOVE_USER:
            return {...state, user: null};
        default:
            return state;
    }
}

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = response.json();
    if  (!data.user) return {user: null}
    console.log(data.user)
    dispatch(setUser(data.user));
    return response
}

export const signup = (user) => async (dispatch) => {
    const {username, password, firstName, lastName, email } = user;
    const response = await csrfFetch('/api/users', {
        method: "POST",
        body: JSON.stringify({
            username, password, firstName, lastName, email
        })
    })
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export default sessionReducer;