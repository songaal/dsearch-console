import * as types from '../constants';

let initState = {
    shards: [],
    nodes: [],
    indices: [],
    health: {},
    store:{},
    move: [],
    route: [],
    remove:String,
    cluster:{
        cluster_name:String,
        indices:{
            shards:{

            },
            docs: {

            },
            store : {

            }
        },
        nodes:{
            count:{
                
            }
        }
    }
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_SHARDS_INFO:
            return {
                ...state,
                shards: actions.payload
            }
        case types.SET_NODES_INFO:
            return {
                ...state,
                nodes: actions.payload
            }
        case types.SET_INDICES_INFO:
            return {
                ...state,
                indices: actions.payload
            }
        case types.SET_HEALTH_INFO:
            return {
                ...state,
                health: actions.payload
            }
        case types.SET_CLUSTER_INFO:
            return {
                ...state,
                cluster: actions.payload
            }
        case types.SET_MOVE_INFO:
            return {
                ...state,
                move: actions.payload
            }
        case types.SET_ROUTE_INFO:
            return {
                ...state,
                route: actions.payload
            }
        case types.SET_REMOVE_INFO:
            return {
                ...state,
                remove: actions.payload
            }
        default:
            return state
    }
}