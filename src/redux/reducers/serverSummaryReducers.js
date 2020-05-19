import * as types from '../constants';
import { string } from 'prop-types';

let initState = {
    server: {
        _nodes: {},
        nodes: {},
        cluster_name: String
    },
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_SERVER_SUMMARY:
            return {
                ...state,
                server: actions.payload
            };
        default:
            return state
    }
}
