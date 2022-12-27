import {
    SET_DYNAMICINDEX_LIST_INFO,
    SET_DYNAMICINDEX_STATE_INFO,
    SET_DYNAMICINDEX_BUNDLE_LIST_INFO,
    SET_DYNAMICINDEX_ALL_STATE_INFO,
    SET_DYNAMICINDEX_STATE_CHANGE_INFO,
    SET_DYNAMICINDEX_UPLOAD_INFO
} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setDynamicIndexInfoListActions = key => dispatch => client.call({uri: `/dynamicIndex`})
    .then(response => dispatch({type: SET_DYNAMICINDEX_LIST_INFO, payload: response.data}))
    .catch(err => console.error(err))

export const setDynamicIndexInfoBundleListActions = desc => dispatch => client.call({uri: `/dynamicIndex/bundle?desc=${desc}`})
    .then(response => dispatch({type: SET_DYNAMICINDEX_BUNDLE_LIST_INFO, payload: response.data}))
    .catch(err => console.error(err))

export const setDynamicIndexStatusInfoActions = id => dispatch => client.call({uri: `/dynamicIndex/state/${id}`})
    .then(response => {dispatch({type: SET_DYNAMICINDEX_STATE_INFO, payload: response.data})})
    .catch(err => console.error(err))

export const setDynamicIndexAllStatusInfoActions = key => dispatch => client.call({uri: `/dynamicIndex/state`})
    .then(response => {dispatch({type: SET_DYNAMICINDEX_ALL_STATE_INFO, payload: response.data})})
    .catch(err => console.error(err))

export const setDynamicIndexStatusChangeActions = (id, body) => dispatch => client.call({
        uri: `/dynamicIndex/consume-all/${id}`,
        method: "PUT",
        data: body
    }).then(response => dispatch({type: SET_DYNAMICINDEX_STATE_CHANGE_INFO, payload: response.data}))
    .catch(err => console.error(err))

export const setDynamicIndexUploadActions = (body) => dispatch => client.call({
        uri: `/dynamicIndex`,
        method: "PUT",
        data: body
    }).then(response => dispatch({type: SET_DYNAMICINDEX_UPLOAD_INFO, payload: response.data}))
    .catch(err => console.error(err))