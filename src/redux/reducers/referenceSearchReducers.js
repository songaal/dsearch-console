import * as types from '../constants';

let initState = {
    keyword: '',
    templateList: [],
    template: {}
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
        default:
            return state
    }
}
