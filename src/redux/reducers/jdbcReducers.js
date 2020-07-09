import * as types from '../constants';

let initState = {
    JdbcList: {
        hits:{
            hits: []
        }
    },
    JdbcAccessTest: {},
    JdbcDeleteResult:{},
    JdbcAddResult:{}
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_JDBC_LIST:
            return {
                ...state,
                JdbcList: actions.payload
            }
        case types.SET_JDBC_ACCESS_TEST:
            return {
                ...state,
                JdbcAccessTest: actions.payload
            }
        case types.SET_JDBC_ADD_RESULT:
            return{
                ...state,
                JdbcAddResult: actions.payload
            }
        case types.SET_JDBC_DELETE_RESULT:
            return {
                ...state,
                JdbcDeleteResult: actions.payload
            }
        default:
            return state
    }
}