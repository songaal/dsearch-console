import {SET_CLUSTER_STATUS, SET_CLUSTER, SET_CLUSTER_LIST} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setClusterList = () => dispatch => client.call({
    uri: "/clusters",
}).then(response => dispatch({type: SET_CLUSTER_LIST, payload: response.data}))

export const setClusterStatus = (cluster) => dispatch => client.call({
    uri: "/elasticsearch/status",
    method: "POST",
    data: cluster,
}).then(response => response.data)

export const addCluster = (cluster) => dispatch => client.call({
    uri: "/clusters",
    method: "POST",
    data: cluster,
}).then(response => {
    dispatch({type: SET_CLUSTER, payload: response.data})
    return response.data
})