import {SET_FASTCATX_AUTH_USER, SET_FASTCATX_SERVER} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setFastcatxServer = fastcatxServer => dispatch => client.call({
    url: `${fastcatxServer}/info`,
    timeout: 500
}).then(response => {
    if (response['status'] === 200) {
        localStorage.setItem(SET_FASTCATX_SERVER, fastcatxServer);
        return fastcatxServer;
    } else {
        localStorage.removeItem(SET_FASTCATX_SERVER);
        return null;
    }
}).catch(err => {
    localStorage.removeItem(SET_FASTCATX_SERVER)
    dispatch({type: SET_FASTCATX_SERVER, payload: ''})
    console.error(err)
})

export const setFastcatxAuthUser = () => dispatch => client.call({
    uri: `/auth`,
}).then(response => {
    const authUser = response.data
    sessionStorage.setItem(SET_FASTCATX_AUTH_USER, JSON.stringify(authUser))
    dispatch({type: SET_FASTCATX_AUTH_USER, payload: authUser})
    return authUser
})

export const setFastcatxSignIn = user => dispatch => client.call({
    uri: `/auth/sign-in`,
    method: "post",
    data: user
}).then(response => {
    console.log('response', response.data)
    sessionStorage.setItem(SET_FASTCATX_AUTH_USER, JSON.stringify(response.data))
    dispatch({type: SET_FASTCATX_AUTH_USER, payload: response.data})
})

export const setFastcatxSignOut = () => dispatch => client.call({
    uri: `/auth/sign-out`,
    method: "post"
}).then(response => {
    dispatch({type: SET_FASTCATX_AUTH_USER, payload: {}})
    sessionStorage.removeItem(SET_FASTCATX_AUTH_USER)
})

export const editUserPassword = (id, updateUser) => dispatch => client.call({
    uri: `/users/${id}`,
    method: 'PUT',
    params: {action: "UPDATE_PASSWORD"},
    data: updateUser
}).then(response => {
    console.log(response.data)
})