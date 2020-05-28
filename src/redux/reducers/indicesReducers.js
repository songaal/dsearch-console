import * as types from '../constants';

let initState = {
    index: "",
    indices: [],
    hidden: []
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_INDEX:
            return {
                ...state,
                index: actions.payload
            };
        case types.SET_INDICES:
            let index = ""
            let hidden = []
            if (actions.payload && actions.payload.length > 0) {
                let match = actions.payload.filter(index => index === state.index)
                hidden = actions.payload.filter(index => index.startsWith('.'))
                let show = actions.payload.filter(index => index.startsWith('.') === false)
                if (match.length === 1) {
                    index = match[0]
                } else if (show.length > 0) {
                    index = show[0]
                }
            }
            return {
                ...state,
                index: index,
                hidden: hidden,
                indices: actions.payload.filter(index => index.startsWith('.') === false)
            };
        default:
            return state
    }
}
