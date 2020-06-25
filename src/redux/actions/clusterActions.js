import {SET_CLUSTER, SET_CLUSTER_LIST} from "../constants";
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

export const removeClusterAction = id => dispatch => client.call({
    uri: `/clusters/${id}`,
    method: "DELETE"
}).then(response => {
    dispatch({type: SET_CLUSTER, payload: response.data})
    return response.data
})

export const editCluster = (id, cluster) => dispatch => client.call({
    uri: `/clusters/${id}`,
    method: "PUT",
    data: cluster,
}).then(response => {
    dispatch({type: SET_CLUSTER, payload: response.data})
    return response.data
})
