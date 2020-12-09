import * as types from '../constants';

let initState = {
    cluster: {},
    clusterList: [],
    clusterStatus: {},
    serverCheck: false
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_CLUSTER:
            return {
                ...state,
                cluster: actions.payload
            };
        case types.SET_CLUSTER_LIST:
            return {
                ...state,
                clusterList: actions.payload
            };
        case types.SET_SERVER_CHECK:
            return {
                ...state,
                serverCheck: actions.payload
            }
        default:
            return state
    }
}
