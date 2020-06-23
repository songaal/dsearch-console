import {SET_API_MANAGEMENT, SET_ROLE, SET_ROLE_LIST} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setRoleListAction = () => dispatch => client.call({
    uri: `/roles`
}).then(response => dispatch({type: SET_ROLE_LIST, payload: response.data}))
    .catch(err => console.error(err))

export const addRoleAction = role => dispatch => client.call({
    uri: `/roles`,
    method: "POST",
    data: role
}).then(response => dispatch({type: SET_ROLE, payload: response.data}))
    .catch(err => console.error(err))

export const editRoleAction = (id, role) => dispatch => client.call({
    uri: `/roles/${id}`,
    method: "PUT",
    data: role
}).then(response => dispatch({type: SET_ROLE, payload: response.data}))
    .catch(err => console.error(err))

export const removeRoleAction = (id) => dispatch => client.call({
    uri: `/roles/${id}`,
    method: "DELETE"
})