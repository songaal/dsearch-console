import * as types from '../constants';

let initState = {
    dynamicInfoList: [],
    dynamicInfoBundleList: [],
    dynamicInfo: [],
    dynamicState: {},
    dynamicAllState: {},
    dynamicChangeState: 0,
    dynamicUpload: 0
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_DYNAMIC_LIST_INFO:
            return {
                ...state,
                dynamicInfoList: actions.payload
            }
        case types.SET_DYNAMIC_BUNDLE_LIST_INFO:
            return {
                ...state,
                dynamicInfoBundleList: actions.payload
            }
        case types.SET_DYNAMIC_INFO:
            return {
                ...state,
                dynamicInfo: actions.payload
            }
        case types.SET_DYNAMIC_STATE_INFO:
            return {
                ...state,
                dynamicState: actions.payload
            }
        case types.SET_DYNAMIC_ALL_STATE_INFO:
            return {
                ...state,
                dynamicAllState: actions.payload
            }
        case types.SET_DYNAMIC_STATE_CHANGE_INFO:
            return {
                ...state,
                dynamicChangeState: actions.payload
            }
        case types.SET_DYNAMIC_UPLOAD_INFO:
            return {
                ...state,
                dynamicUpload: actions.payload
            }
        default:
            return state
    }
}