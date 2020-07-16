import * as types from '../constants';

let initState = {
    analyzerList: [],
    pluginList: {
        plugins: []
    },
    resultBrief: {},
    resultDetail: {}
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_TOOLS_ANALYZER_LIST:
            return {
                ...state,
                analyzerList: actions.payload
            }
        case types.SET_TOOLS_PLUGIN_LIST:
            return {
                ...state,
                pluginList: actions.payload
            }
        case types.SET_TOOLS_ANALYZE_BRIEF_RESULT:
            return {
                ...state,
                resultBrief: actions.payload
            }
        case types.SET_TOOLS_ANALYZE_DETAIL_RESULT:
            return {
                ...state,
                resultDetail: actions.payload
            }
        default:
            return state
    }
}