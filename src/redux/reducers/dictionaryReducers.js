import * as types from '../constants';

let initState = {
    summary: {},
    activeIndex: 0,
    settings: [],
    dataSet: {},
    searchResult: {
        result: [
            {type: "SYSTEM", posTag: "N", prob:"0"}
        ]
    },
    indexSettings: {},
    infoDict: {},
    date: {
        hits :{
            hits: []
        }
    }
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_ACTIVE_SETTING_INDEX:    return { ...state, activeIndex: actions.payload }
        case types.SET_SETTING_DICTIONARIES:    return { ...state, settings: actions.payload }
        case types.SET_DICTIONARY_DATASET: {
            let cloneDataSet = Object.assign({}, state['dataSet'])
            cloneDataSet[actions.dictionary] = actions.payload
            return { ...state, dataSet: cloneDataSet};
        }
        case types.SET_DICTIONARY_SEARCH_LIST:
            return {...state, searchResult: actions.payload}
        case types.SET_DICTIONARY_INFO:
            return {...state, infoDict: actions.payload}
        case types.SET_DICTIONARY_INDEX_SETTINGS:
            return {...state, indexSettings: actions.payload}
        case types.SET_DICTIONARY_INDEX_DATE:
            return {...state, date: actions.payload}
        case types.SET_SUMMARY:
            return {...state, summary : actions.payload}
        default: return state
    }
}
