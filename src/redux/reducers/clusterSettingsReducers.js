import * as types from '../constants';

let initState = {
    persistent: {},
    transient: {},
    defaults: {},
    dsearch: {}
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
        case types.SET_DSEARCH_SETTINGS:
                return {
                    ...state,
                    dsearch: actions.payload,
                };
        default:
            return state
    }
}
