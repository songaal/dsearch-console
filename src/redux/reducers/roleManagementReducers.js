import * as types from '../constants';

let initState = {
    roleList: [],
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_ROLE_LIST:
            return {
                ...state,
                roleList: actions.payload
            };
        default:
            return state
    }
}
