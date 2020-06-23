import {SET_API_MANAGEMENT, SET_USER_LIST} from "../constants";
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
}).then(response => console.log(response.data))
    .catch(error => console.error(error))
