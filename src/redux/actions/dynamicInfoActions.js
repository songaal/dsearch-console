import {
    SET_DYNAMIC_LIST_INFO,
    SET_DYNAMIC_STATE_INFO,
    SET_DYNAMIC_STATE_CHANGE_INFO,
    SET_DYNAMIC_UPLOAD_INFO,
    SET_DYNAMIC_BUNDLE_LIST_INFO,
    SET_DYNAMIC_ALL_STATE_INFO
} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setDynamicInfoListActions = key => dispatch => client.call({uri: `/dynamicIndex`})
    .then(response => dispatch({type: SET_DYNAMIC_LIST_INFO, payload: response.data}))
    .catch(err => console.error(err))

export const setDynamicInfoBundleListActions = desc => dispatch => client.call({uri: `/dynamicIndex/bundle?desc=${desc}`})
    .then(response => dispatch({type: SET_DYNAMIC_BUNDLE_LIST_INFO, payload: response.data}))
    .catch(err => console.error(err))

export const setDynamicStatusInfoActions = id => dispatch => client.call({uri: `/dynamicIndex/state/${id}`})
    .then(response => {dispatch({type: SET_DYNAMIC_STATE_INFO, payload: response.data})})
    .catch(err => console.error(err))

export const setDynamicAllStatusInfoActions = key => dispatch => client.call({uri: `/dynamicIndex/state`})
    .then(response => {dispatch({type: SET_DYNAMIC_ALL_STATE_INFO, payload: response.data})})
    .catch(err => console.error(err))

export const setDynamicStatusChangeActions = (id, body) => dispatch => client.call({
        uri: `/dynamicIndex/consume-all/${id}`,
        method: "PUT",
        data: body
    }).then(response => dispatch({type: SET_DYNAMIC_STATE_CHANGE_INFO, payload: response.data}))
    .catch(err => console.error(err))

export const setDynamicUploadActions = (body) => dispatch => client.call({
        uri: `/dynamicIndex`,
        method: "PUT",
        data: body
    }).then(response => dispatch({type: SET_DYNAMIC_UPLOAD_INFO, payload: response.data}))
    .catch(err => console.error(err))