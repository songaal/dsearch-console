import * as types from '../constants';

let initState = {
    result: {
        result: []
    },
    running: {
    },
    // running: {
    //     hits: {
    //         hits:[
    //             {
    //                 index:String,
    //                 _source:{
    //                     index: String,
    //                     alias: String,
    //                     docSize: Number,
    //                     endTime: Date,
    //                     startTime: Date,
    //                     status: String,
    //                     storage: String
    //                 }
    //             }
    //         ]
    //     }
    // },
    status:{
        
    },
    alias:[
        
    ],
    indices:{}
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_INDEX_RESULT:
            return {
                ...state,
                result: actions.payload
            }
        case types.SET_RUNNING_INDEX:
            return {
                ...state,
                running: actions.payload
            }
        case types.SET_INDEX_STATUS:
            return {
                ...state,
                status: actions.payload
            }
        case types.SET_INDEX_ALIAS:
            return {
                ...state,
                alias: actions.payload
            }
        case types.SET_DASHBOARD_INDICES_INFO:
            return{
                ...state,
                indices: actions.payload
            }
        default:
            return state
    }
}