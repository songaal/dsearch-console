import * as types from '../constants';

let initState = {
    index: "",
    indices: [],
    hidden: [],
    indexInfoList: [],
    aliases: [],
    settings: {},
    mappings: {},
    indexState: {},
    documents: {}
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_INDEX:
            return {
                ...state,
                index: actions.payload
            };
        case types.SET_INDICES:
            let index = ""
            let hidden = []
            if (actions.payload && actions.payload.length > 0) {
                let match = actions.payload.filter(index => index['index'] === state.index)
                hidden = actions.payload.filter(index => index['index'].startsWith('.'))
                let show = actions.payload.filter(index => index['index'].startsWith('.') === false)
                if (match.length === 1) {
                    index = match[0]['index']
                } else if (show.length > 0) {
                    index = show[0]['index']
                }
            }
            return {
                ...state,
                index: index,
                hidden: hidden,
                indices: actions.payload
            };
        case types.SET_INDEX_INFO_LIST:
            return {
                ...state,
                indexInfoList: actions.payload
            };
        case types.SET_INDEX_ALIASES:
            return {
                ...state,
                aliases: actions.payload
            };
        case types.SET_INDEX_MAPPINGS:
            return {
                ...state,
                mappings: actions.payload
            };
        case types.SET_INDEX_SETTINGS:
            return {
                ...state,
                settings: actions.payload
            };
        case types.SET_INDEX_STATE:
            return {
                ...state,
                indexState: actions.payload
            };
        case types.SET_INDEX_DOCUMENTS:
            return {
                ...state,
                documents: actions.payload
            };
        default:
            return state
    }
}
