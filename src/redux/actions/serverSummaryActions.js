import {SET_SERVER_SUMMARY} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setServerSummaryActions = key => dispatch => client.call({uri: `/elasticsearch/_nodes`})
    .then(response => dispatch({type: SET_SERVER_SUMMARY, payload: response.data}))
    .catch(err => console.error(err))


