import * as types from "../constants";
import client from '~/utils/client'
import { SET_API_MANAGEMENT } from "../constants";


export const setApiManagementActions = key => dispatch => client.call({ uri: `/elasticsearch/_cat/${key}?format=json` })
    .then(response => dispatch({ type: SET_API_MANAGEMENT, payload: response.data}))
    .catch(err => console.error(err))


