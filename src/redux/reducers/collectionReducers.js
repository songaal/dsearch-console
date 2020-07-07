import * as types from '../constants';

let initState = {
    indexSuffixA: "",
    indexSuffixB: "",
    collection: {},
    collectionList: [],
    matchedIndexTemplates: []
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_COLLECTION_INDEX_SUFFIX:
            return {
                ...state,
                indexSuffixA: actions.payload['indexSuffixA'],
                indexSuffixB: actions.payload['indexSuffixB'],
            }
        case types.SET_COLLECTION:
            return {
                ...state,
                collection: actions.payload
            }
        case types.SET_COLLECTION_LIST:
            return {
                ...state,
                collectionList: actions.payload['list']
            };
        default:
            return state
    }
}
