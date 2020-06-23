import * as types from '../constants';
import {SET_USER_LIST} from "../constants";

let initState = {
    user: {},
    userList: [],
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_USER_LIST:
            return {
                ...state,
                userList: actions.payload
            };
        default:
            return state
    }
}
