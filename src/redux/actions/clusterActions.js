import {SET_CLUSTER, SET_CLUSTER_LIST, SET_SERVER_CHECK} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setClusterList = ({isStatus} = { isStatus: true }) => dispatch => client.call({
    uri: "/clusters?isStatus=" + isStatus,
}).then(response => {
    dispatch({type: SET_CLUSTER_LIST, payload: response.data})
    return response.data
})

export const setClusterStatus = (cluster) => dispatch => client.call({
    uri: "/elasticsearch/status",
    method: "POST",
    data: cluster,
}).then(response => response.data)


export const setKibanaStatus = (url) => dispatch => client.call({
    uri: "/kibana/status",
    method: "POST",
    data: {"url": url},
})

export const addCluster = (cluster) => dispatch => client.call({
    uri: "/clusters",
    method: "POST",
    data: cluster,
}).then(response => {
    dispatch({type: SET_CLUSTER, payload: response.data})
    return response.data
})

export const removeClusterAction = (id,isRemoveData) => dispatch => client.call({
    uri: `/clusters/${id}?isRemoveData=${isRemoveData}`,
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

export const setClusterServerCheck = () => dispatch => client.call({
    uri: "/elasticsearch/_cluster/settings?filter_path=transient.cluster.routing.allocation",
    method: "GET"
}).then(response => {
    //{
    //   "transient" : {
    //     "cluster" : {
    //       "routing" : {
    //         "allocation" : {
    //           "enable" : "all"
    //         }
    //       }
    //     }
    //   }
    // }
    const data = response.data
    const enable = ((((data['transient']||{})['cluster']||{})['routing']||{})['allocation']||{})['enable']||"all"
    dispatch({type: SET_SERVER_CHECK, payload: enable !== "all"})
    return response.data
})

export const editClusterServerCheck = (flag) => dispatch => client.call({
    uri: "/elasticsearch/_cluster/settings",
    method: "PUT",
    data: {
        transient : {
            cluster : {
                routing : {
                    allocation : {
                        enable : flag
                    }
                }
            }
        }
    }
}).then(response => response.data)

export const editClusterFlush = () => dispatch => client.call({
    uri: "/elasticsearch/_flush/synced",
    method: "POST"
}).then(response => response.data)


export const editClusterServerCheckAfterScheduleFlush = (flag) => dispatch => client.call({
    uri: "/clusters/check",
    method: "GET",
    params: {
        flag: flag
    }
})
