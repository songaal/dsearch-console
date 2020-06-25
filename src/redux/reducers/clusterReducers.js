import * as types from '../constants';

let initState = {
    cluster: {},
    clusterList: [],
    clusterStatus: {}
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
        default:
            return state
    }
}
