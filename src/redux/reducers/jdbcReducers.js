import * as types from '../constants';

let initState = {
    JdbcIndex: {},
    JdbcList: {
        list: []
    },
    JdbcAccessTest: { message : false},
    changedJdbcList: false
};

export default function reducer(state = initState, actions) {
    switch (actions.type) {
        case types.SET_JDBC_LIST:
            return {
                ...state,
                changedJdbcList: false,
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
                changedJdbcList: true
            }
        case types.SET_JDBC_DELETE_RESULT:
            return {
                ...state,
                changedJdbcList: true
            }
        case types.SET_JDBC_INDEX:
            return {
                ...state,
                JdbcIndex: actions.payload
            }
        case types.SET_JDBC_UPDATE_RESULT:
            return {
                ...state,
                changedJdbcList: true
            }
        default:
            return state
    }
}