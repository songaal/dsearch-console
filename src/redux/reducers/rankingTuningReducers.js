import * as types from '../constants';

let initState = {
    
    result: { 
        Total : {},
        SearchResponse: [],
        analyzerTokensMap: {}
    }
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_RANKING_TUNING_DOCUMENT:
            return {
                ...state,
                result: actions.payload
            }
        default:
            return state
    }
}