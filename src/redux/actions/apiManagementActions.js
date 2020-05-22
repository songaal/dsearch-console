import {SET_API_MANAGEMENT} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setApiManagementActions = key => dispatch => client.call({uri: `/elasticsearch/_cat/${key}?format=json`})
    .then(response => dispatch({type: SET_API_MANAGEMENT, payload: response.data}))
    .catch(err => console.error(err))


