import * as types from '../constants';

let initState = {
    persistent: {},
    transient: {},
    defaults: {},
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_CLUSTER_SETTINGS:
            return {
                ...state,
                persistent: actions.payload['persistent'],
                transient: actions.payload['transient'],
                defaults: actions.payload['defaults'],
            };
        default:
            return state
    }
}
