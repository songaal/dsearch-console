import * as types from '../constants';

let initState = {
    mapping: {},
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_INDICES_MAPPING:
            return {
                ...state,
                mapping: actions.payload
            };
        default:
            return state
    }
}
