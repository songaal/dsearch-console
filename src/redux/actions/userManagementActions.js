import {SET_USER, SET_USER_LIST} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setUserListAction = () => dispatch => client.call({
    uri: `/users`
}).then(response => dispatch({type: SET_USER_LIST, payload: response.data}))
    .catch(err => console.error(err))


export const addUserAction = user => dispatch => client.call({
    uri: `/users`,
    method: "POST",
    data: user,
}).then(response => {
    dispatch({type: SET_USER, payload: response.data})
    return response
})
    .catch(error => console.error(error))

export const resetPasswordAction = id => dispatch => client.call({
    uri: `/users/${id}`,
    method: "PUT",
    params: {
        action: "RESET_PASSWORD"
    },
    data: {}
}).then(response => {
    dispatch({type: SET_USER, payload: response.data})
    return response
})

export const setUserEditAction = (id, user) => dispatch => client.call({
    uri: `/users/${id}`,
    method: "PUT",
    params: {
        action: "EDIT_PROFILE"
    },
    data: user
}).then(response => {
    dispatch({type: SET_USER, payload: response.data})
})

export const removeUserAction = (id) => dispatch => client.call({
    uri: `/users/${id}`,
    method: "DELETE"
}).then(response => {
    console.log(response)
})