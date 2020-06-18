import * as types from '../constants';

let initState = {
    templates: [],
    template: {},
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_INDEX_TEMPLATES:
            return {
                ...state,
                templates: actions.payload
            };
        case types.SET_INDEX_TEMPLATE:
            return {
                ...state,
                template: actions.payload
            };
        default:
            return state
    }
}
