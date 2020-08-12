import * as types from '../constants';
import Autocomplete from 'react-autocomplete';

let initState = {
   pluginResponse : {},
   autoCompleteUrl: ''
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_PLUGIN_KEYWORD:
            return {
                ...state,
                pluginResponse: actions.payload
            }
        case types.SET_AUTOCOMPLETE_URL:
            return {
                ...state,
                autoCompleteUrl: actions.payload.url
            }
        default:
            return state
    }
}