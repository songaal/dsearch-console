import {SET_DSEARCH_AUTH_USER, SET_DSEARCH_SERVER} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setDsearchServer = dsearchServer => dispatch => client.call({
    url: `${dsearchServer}/info`,
    timeout: 500
}).then(response => {
    if (response['status'] === 200) {
        localStorage.setItem(SET_DSEARCH_SERVER, dsearchServer);
        return dsearchServer;
    } else {
        localStorage.removeItem(SET_DSEARCH_SERVER);
        return null;
    }
}).catch(err => {
    localStorage.removeItem(SET_DSEARCH_SERVER)
    dispatch({type: SET_DSEARCH_SERVER, payload: ''})
    console.error(err)
})

export const setDsearchAuthUser = () => dispatch => client.call({
    uri: `/auth`,
}).then(response => {
    const authUser = response.data
    let token = (response['headers']||{})['x-bearer-token']
    if(token) {
        authUser["token"] = token
        sessionStorage.setItem(SET_DSEARCH_AUTH_USER, JSON.stringify(authUser))
        dispatch({type: SET_DSEARCH_AUTH_USER, payload: authUser})
        return authUser
    } else {
        console.error('error', response)
        throw new Error()
    }
    return response
})

export const setDsearchSignIn = user => dispatch => client.call({
    uri: `/auth/sign-in`,
    method: "post",
    data: user
}).then(response => {
    sessionStorage.setItem(SET_DSEARCH_AUTH_USER, JSON.stringify(response.data))
    dispatch({type: SET_DSEARCH_AUTH_USER, payload: response.data})
})

export const setDsearchSignOut = () => dispatch => client.call({
    uri: `/auth/sign-out`,
    method: "post"
}).then(response => {
    dispatch({type: SET_DSEARCH_AUTH_USER, payload: {}})
    sessionStorage.removeItem(SET_DSEARCH_SERVER);
    sessionStorage.removeItem(SET_DSEARCH_AUTH_USER);
    return response.data
})

export const editUserPassword = (id, updateUser) => dispatch => client.call({
    uri: `/users/${id}`,
    method: 'PUT',
    params: {action: "UPDATE_PASSWORD"},
    data: updateUser
}).then(response => {
    console.log(response.data)
})