import * as types from '../constants';

let initState = {
    searchQueryList: [],
    analysisData: {
        "isSuccess": true,
        "analysis": {}
    },
    analysisDataDetail: {}
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.READ_SEARCH_QUERYS:
            return {
                ...state,
                searchQueryList: actions.payload
            }
        case types.ANALYSIS_DOCUMENT:
            return {
                ...state,
                analysisData: actions.payload
            }
        case types.ANALYSIS_DOCUMENT_DETAIL:
            return {
                ...state,
                analysisDataDetail: actions.payload
            }
        default:
            return state
    }
}