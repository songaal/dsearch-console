import {
    SET_JDBC_ACCESS_TEST,
    SET_JDBC_ADD_RESULT,
    SET_JDBC_DELETE_RESULT,
    SET_JDBC_LIST,
    SET_JDBC_UPDATE_RESULT
} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setJDBCList = () => dispatch => client.call({
    uri: "/jdbc/list",
    method: "GET"
}).then(response => dispatch({type: SET_JDBC_LIST, payload: response.data}))

export const setJDBCAccessTest = (data) => dispatch => client.call({
    uri: "/jdbc/",
    method: "POST",
    data: data
}).then(response => {
    dispatch({type:SET_JDBC_ACCESS_TEST , payload: response.data}); 
    return true
})

export const addJdbcIndex = (data) => dispatch => client.call({
    uri: "/jdbc/add",
    method: 'PUT',
    data: data
}).then(response => dispatch({ type: SET_JDBC_ADD_RESULT, payload: response.data}))

export const deleteJdbcSource = (id) => dispatch => client.call({
    uri: "/jdbc/delete/" + id,
    method: 'DELETE'
}).then(response => dispatch({type: SET_JDBC_DELETE_RESULT, payload: response.data}))

export const updateJdbcSource = (id, data) => dispatch => client.call({
    uri: "/jdbc/update/" + id,
    method: 'POST',
    data: data
}).then(response => dispatch({type: SET_JDBC_UPDATE_RESULT, payload: response.data}))