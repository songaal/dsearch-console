import {SET_JDBC_INDEX, SET_JDBC_LIST, SET_JDBC_ACCESS_TEST, SET_JDBC_ADD_RESULT, SET_JDBC_DELETE_RESULT, SET_JDBC_UPDATE_RESULT} from "../constants";
import Client from '~/Client'

const client = new Client()

export const createJDBCIndex = (data) => dispatch => client.call({
    uri: "/elasticsearch/.fastcatx_jdbc",
    method: "PUT",
    data: data
}).then(response => dispatch({type: SET_JDBC_INDEX, payload: response.data }))

export const setJDBCList = () => dispatch => client.call({
    uri: "/elasticsearch/.fastcatx_jdbc/_search",
    method: "GET"
}).then(response => dispatch({type: SET_JDBC_LIST, payload: response.data}))

export const setJDBCAccessTest = (data) => dispatch => client.call({
    uri: "/jdbc/",
    method: "POST",
    data: data
}).then(response => dispatch({type:SET_JDBC_ACCESS_TEST , payload: response.data}))

export const addJdbcIndex = (data) => dispatch => client.call({
    uri: "/elasticsearch/.fastcatx_jdbc/_doc",
    method: 'POST',
    data: data
}).then(response => dispatch({ type: SET_JDBC_ADD_RESULT, payload: response.data}))

export const deleteJdbcSource = (id) => dispatch => client.call({
    uri: "/elasticsearch/.fastcatx_jdbc/_doc/" + id,
    method: 'DELETE'
}).then(response => dispatch({type: SET_JDBC_DELETE_RESULT, payload: response.data}))

export const updateJdbcSource = (id, data) => dispatch => client.call({
    uri: "/elasticsearch/.fastcatx_jdbc/_doc/" + id,
    method: 'PUT',
    data: data
}).then(response => dispatch({type: SET_JDBC_UPDATE_RESULT, payload: response.data}))