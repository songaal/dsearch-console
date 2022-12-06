import * as types from '../constants';

let initState = {
    searchQueryList: []
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.READ_SEARCH_QUERYS:
            return {
                ...state,
                result: actions.payload
            }
        default:
            return state
    }
}