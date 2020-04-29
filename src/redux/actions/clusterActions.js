import * as types from "../constants";

export function setClusterActions(value) {
    return {
        type: types.SET_CLUSTER,
        payload: value
    }
}

export function setClusterListActions(value) {
    return {
        type: types.SET_CLUSTER_LIST,
        payload: value
    }
}
