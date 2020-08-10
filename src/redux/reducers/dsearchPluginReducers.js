import * as types from '../constants';

let initState = {
   pluginResponse : {}
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_PLUGIN_KEYWORD:
            return {
                ...state,
                pluginResponse: actions.payload
            }
        default:
            return state
    }
}