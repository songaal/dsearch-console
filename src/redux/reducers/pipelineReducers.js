import * as types from '../constants';

let initState = {
    pipeline : "",
    pipelineList: {},
    result: {}
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_PIPELINE_LIST:
            return {
                ...state,
                pipelineList: actions.payload
            }
        case types.SET_PIPELINE:
            return {
                ...state,
                pipeline: actions.payload
            }
        case types.SET_PIPELINE_RESULT:
            return {
                ...state,
                result: actions.payload
            }
        default:
            return state
    }
}