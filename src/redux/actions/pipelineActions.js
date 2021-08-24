import {ADD_PIPELINE, DELETE_PIPELINE, SET_PIPELINE, SET_PIPELINE_LIST, SET_PIPELINE_RESULT} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setPipelineAction = (pipeline) => dispatch => dispatch({type: SET_PIPELINE, payload: pipeline})

export const testPipeline = (item, jsonData, isDetail = false) => dispatch => client.call({
    uri: `/pipeline/${item}?isDetail=${isDetail}`,
    method: "POST",
    headers: {'Content-type': 'application/json'},
    data: jsonData
}).then(response => dispatch({type: SET_PIPELINE_RESULT, payload: response.data}))

export const setPipelineList = () => dispatch => client.call({
    uri: "/pipeline/list",
    method: "GET"
}).then(response => dispatch({type: SET_PIPELINE_LIST, payload: response.data}))

export const deletePipeline = (item) => dispatch => client.call({
    uri: "/pipeline/" + item,
    method: "DELETE"
}).then(response => dispatch({type: DELETE_PIPELINE, payload: response.data}))

export const addPipeline = (item, jsonData) => dispatch => client.call({
    uri: "/pipeline/" + item,
    method: "PUT",
    headers: {'Content-type': 'application/json'},
    data: jsonData
}).then(response => dispatch({type: ADD_PIPELINE, payload: response.data})).catch((err) => {
    console.log(err)
})

export const editPipeline = (item, jsonData) => dispatch => client.call({
    uri: "/pipeline/" + item,
    method: "PUT",
    headers: {'Content-type': 'application/json'},
    data: jsonData
}).then(response => dispatch({type: ADD_PIPELINE, payload: response.data}))
