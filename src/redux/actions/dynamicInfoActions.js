import {
    SET_DYNAMIC_LIST_INFO,
    SET_DYNAMIC_STATE_INFO,
    SET_DYNAMIC_INFO,
    SET_DYNAMIC_STATE_CHANGE_INFO,
    SET_DYNAMIC_UPLOAD_INFO,
    SET_DYNAMIC_BUNDLE_LIST_INFO
} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setDynamicInfoListActions = key => dispatch => client.call({uri: `/dynamic/find`})
    .then(response => dispatch({type: SET_DYNAMIC_LIST_INFO, payload: response.data}))
    .catch(err => console.error(err))

export const setDynamicInfoBundleListActions = desc => dispatch => client.call({uri: `/dynamic/bundle/find?desc=${desc}`})
    .then(response => dispatch({type: SET_DYNAMIC_BUNDLE_LIST_INFO, payload: response.data}))
    .catch(err => console.error(err))

export const setDynamicInfoActions = id => dispatch => client.call({uri: `/dynamic/find/${id}`})
    .then(response => dispatch({type: SET_DYNAMIC_INFO, payload: response.data}))
    .catch(err => console.error(err))

export const setDynamicStatusInfoActions = id => dispatch => client.call({uri: `/dynamic/state/${id}`})
    .then(response => dispatch({type: SET_DYNAMIC_STATE_INFO, payload: response.data}))
    .catch(err => console.error(err))

export const setDynamicStatusChangeActions = (id, body) => dispatch => client.call({
        uri: `/dynamic/consume-all/${id}`,
        method: "PUT",
        data: body
    }).then(response => dispatch({type: SET_DYNAMIC_STATE_CHANGE_INFO, payload: response.data}))
    .catch(err => console.error(err))

export const setDynamicUploadActions = (body) => dispatch => client.call({
        uri: `/dynamic/upload`,
        method: "PUT",
        data: body
    }).then(response => dispatch({type: SET_DYNAMIC_UPLOAD_INFO, payload: response.data}))
    .catch(err => console.error(err))