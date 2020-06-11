import * as types from '../constants';

let initState = {
    user: {},
    synonym: {},
    stop: {},
    space: {},
    compound: {},
    unit: {},
    unitSynonym: {},
    maker: {},
    brand: {},
    category: {},
    english: {}
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_DICTIONARY_USER:         return { ...state, user: actions.payload };
        case types.SET_DICTIONARY_SYNONYM:      return { ...state, synonym: actions.payload };
        case types.SET_DICTIONARY_STOP:         return { ...state, stop: actions.payload };
        case types.SET_DICTIONARY_SPACE:        return { ...state, space: actions.payload };
        case types.SET_DICTIONARY_COMPOUND:     return { ...state, compound: actions.payload };
        case types.SET_DICTIONARY_UNIT:         return { ...state, unit: actions.payload };
        case types.SET_DICTIONARY_UNIT_SYNONYM: return { ...state, unitSynonym: actions.payload };
        case types.SET_DICTIONARY_MAKER:        return { ...state, maker: actions.payload };
        case types.SET_DICTIONARY_BRAND:        return { ...state, brand: actions.payload };
        case types.SET_DICTIONARY_CATEGORY:     return { ...state, category: actions.payload };
        case types.SET_DICTIONARY_ENGLISH:      return { ...state, english: actions.payload };
        default: return state
    }
}
