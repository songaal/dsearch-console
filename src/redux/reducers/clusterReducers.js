import * as types from '../constants';

let initState = {
    cluster: {},
    clusterList: [
        {title: "운영클러스터", masterList: ["192.168.0.100"], nodeCount: 10, indicesCount: 50, totalShardCount: 410, useDisk: "1.5TB"},
        {title: "개발클러스터", masterList: ["192.168.0.100"], nodeCount: 3, indicesCount: 10, totalShardCount: 310, useDisk: "512GB"}
    ]
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
