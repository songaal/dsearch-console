import * as types from '../constants';

let initState = {
    activeIndex: 0,
    settings: [],
    dataSet: {}
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
        default: return state
    }
}
