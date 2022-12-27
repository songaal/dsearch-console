import * as types from '../constants';

let initState = {
    dynamicIndexInfoList: [],
    dynamicIndexInfoBundleList: [],
    dynamicIndexState: {},
    dynamicIndexAllState: {},
    dynamicIndexChangeState: 0,
    dynamicIndexUpload: 0
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_DYNAMICINDEX_LIST_INFO:
            return {
                ...state,
                dynamicIndexInfoList: actions.payload
            }
        case types.SET_DYNAMICINDEX_BUNDLE_LIST_INFO:
            return {
                ...state,
                dynamicIndexInfoBundleList: actions.payload
            }
        case types.SET_DYNAMICINDEX_STATE_INFO:
            return {
                ...state,
                dynamicIndexState: actions.payload
            }
        case types.SET_DYNAMICINDEX_ALL_STATE_INFO:
            return {
                ...state,
                dynamicIndexAllState: actions.payload
            }
        case types.SET_DYNAMICINDEX_STATE_CHANGE_INFO:
            return {
                ...state,
                dynamicIndexChangeState: actions.payload
            }
        case types.SET_DYNAMICINDEX_UPLOAD_INFO:
            return {
                ...state,
                dynamicIndexUpload: actions.payload
            }
        default:
            return state
    }
}