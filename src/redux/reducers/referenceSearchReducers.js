import * as types from '../constants';
import {SET_REFERENCE_RESULT_ALL} from "../constants";

let initState = {
    keyword: '',
    templateList: [],
    template: {},
    resultList: []
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_REFERENCE_SEARCH_KEYWORD:
            return {
                ...state,
                keyword: actions.payload
            };
        case types.SET_REFERENCE_TEMPLATE_LIST:
            return {
                ...state,
                templateList: actions.payload
            };
        case types.SET_REFERENCE_TEMPLATE:
            return {
                ...state,
                template: actions.payload
            };
        case types.SET_REFERENCE_RESULT_ALL:
            return {
                ...state,
                resultList: actions.payload
            };
        case types.SET_REFERENCE_RESULT:
            let cloneResultList = state.resultList.slice()
            const index = cloneResultList.findIndex(result => result['template']['id'] === actions.id)
            if (index >= 0) {
                actions.payload['documents']['hits'] = cloneResultList[index]['documents']['hits'].concat(actions.payload['documents']['hits'])
                cloneResultList[index] = actions.payload
            }
            return {
                ...state,
                resultList: cloneResultList
            };
        default:
            return state
    }
}
