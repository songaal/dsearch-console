import * as types from '../constants';

let initState = {
    indicesSourceDataList: [],
    indicesIndexedDataList: [],
    params: {
        index: "",
        from: 0,
        size: 100,
        id: "",
    }
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_INDICES_SOURCE_DATA_LIST:
            return {
                ...state,
                params: Object.assign(actions.params, state.params),
                indicesSourceDataList: actions.payload
            };
        case types.SET_INDICES_INDEXED_DATA_LIST:
            return {
                ...state,
                params: Object.assign(actions.params, state.params),
                indicesIndexedDataList: actions.payload
            };
        default:
            return state
    }
}
