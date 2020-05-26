import * as types from '../constants';

let initState = {
    index: "",
    indices: [],
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_INDEX:
            return {
                ...state,
                index: actions.payload
            };
        case types.SET_INDICES:
            return {
                ...state,
                indices: actions.payload
            };
        default:
            return state
    }
}
