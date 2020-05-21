import * as types from '../constants';

let initState = {
    cat: [],
};

export default function reducer(state = initState, actions) {
    console.log(actions)
    switch (actions.type) {
        case types.SET_API_MANAGEMENT:
            return {
                ...state,
                cluster: actions.payload
            };
        default:
            return state
    }
}
