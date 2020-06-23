import * as types from '../constants';

let initState = {
    role: {},
    roleList: [],
    userRolesList: []
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_ROLE_LIST:
            return {
                ...state,
                roleList: actions.payload['roles'],
                userRolesList: actions.payload['userRoles']
            };
        case types.SET_ROLE:
            return {
                ...state,
                role: actions.payload
            };
        default:
            return state
    }
}
