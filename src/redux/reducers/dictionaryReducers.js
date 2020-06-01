import * as types from '../constants';

let initState = {
    user: {},

};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_DICTIONARY_USER:
            return {
                ...state,
                user: actions.payload
            };
        default:
            return state
    }
}
