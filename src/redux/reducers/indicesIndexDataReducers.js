import * as types from '../constants';

let initState = {
    indicesDataList: [],
    indicesIndexedDataList: [],
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_INDICES_DATA_LIST:
            return {
                ...state,
                indicesDataList: actions.payload
            };
        case types.SET_INDICES_INDEXED_DATA_LIST:
            return {
                ...state,
                indicesIndexDataList: actions.payload
            };
        default:
            return state
    }
}
