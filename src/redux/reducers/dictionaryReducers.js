import * as types from '../constants';
import { updateDictionary } from '../actions/dictionaryActions';

let initState = {
    
    activeIndex: 0,
    settings: [],
    dataSet: {},
    searchResult: {
        result: [
            {type: "SYSTEM", posTag: "N", prob:"0"}
        ]
    },
    update: { },
    summary: { }
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
            return {
                ...state, 
                searchResult: actions.payload
            };
        case types.SET_DICTIONARY:
            return {...state, update: actions.payload};
        case types.SET_SUMMARY:                 return { ...state, summary: actions.payload }
        default: return state
    }
}
