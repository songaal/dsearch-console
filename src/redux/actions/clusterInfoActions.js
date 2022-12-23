import {
    SET_CLUSTER_INFO,
    SET_HEALTH_INFO,
    SET_INDICES_INFO,
    SET_NODES_INFO,
    SET_SHARDS_INFO,
    SET_MOVE_INFO,
    SET_ROUTE_INFO,
    SET_REMOVE_INFO
} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setShardsInfoActions = key => dispatch => client.call({uri: `/elasticsearch/_cat/shards?format=json`})
    .then(response => dispatch({type: SET_SHARDS_INFO, payload: response.data}))
    .catch(err => console.error(err))

export const setNodesInfoActions = key => dispatch => client.call({uri: `/elasticsearch/_cat/nodes?s=name:asc&format=json`})
    .then(response => dispatch({type: SET_NODES_INFO, payload: response.data}))
    .catch(err => console.error(err))

export const setIndicesInfoActions = key => dispatch => client.call({uri: `/elasticsearch/_cat/indices?format=json`})
    .then(response => dispatch({type: SET_INDICES_INFO, payload: response.data}))
    .catch(err => console.error(err))    

export const setClusterInfoActions = key => dispatch => client.call({uri: `/elasticsearch/_cluster/stats?human`})
    .then(response => dispatch({type: SET_CLUSTER_INFO, payload: response.data}))
    .catch(err => console.error(err))     

export const setHealthInfoActions = key => dispatch => client.call({uri: `/elasticsearch/_cluster/health`})
    .then(response => dispatch({type: SET_HEALTH_INFO, payload: response.data}))
    .catch(err => console.error(err))

export const setMoveInfoActions = key => dispatch => client.call({uri: `/node/move/info`})
    .then(response => dispatch({type: SET_MOVE_INFO, payload: response.data}))
    .catch(err => console.error(err))

export const setRouteInfoActions = key => dispatch => client.call({uri: `/node/_cluster/settings`})
    .then(response => dispatch({type: SET_ROUTE_INFO, payload: response.data}))
    .catch(err => console.error(err))

export const removeNodeAction = (body) => dispatch => client.call({
        uri: `/node/_cluster/remove`,
        method: "PUT",
        data: body,
    }).then(response => dispatch({type: SET_REMOVE_INFO, payload: response.data}))
    .catch(err => console.error(err))