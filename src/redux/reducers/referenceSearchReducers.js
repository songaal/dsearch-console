import * as types from '../constants';

let initState = {
    results: []
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_REFERENCE_SEARCH_KEYWORD:
            return {
                ...state,
                results: actions.payload
            };
        default:
            return state
    }
}
