import {SET_API_MANAGEMENT, SET_ROLE_LIST} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setRoleListAction = () => dispatch => client.call({
    uri: `/roles`
}).then(response => dispatch({type: SET_ROLE_LIST, payload: response.data}))
    .catch(err => console.error(err))

