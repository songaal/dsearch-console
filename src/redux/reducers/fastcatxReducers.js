import * as types from '../constants';

let initState = {
    authUser: {}
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_FASTCATX_AUTH_USER:
            return {
                ...state,
                authUser: actions.payload
            }
        default:
            return state
    }
}
