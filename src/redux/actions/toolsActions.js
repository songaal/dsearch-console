import {SET_TOOLS_ANALYZER_LIST, SET_TOOLS_PLUGIN_LIST, SET_TOOLS_ANALYZE_BRIEF_RESULT,  SET_TOOLS_ANALYZE_DETAIL_RESULT} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setAnalyzerList = () => dispatch => client.call({
    uri: "/elasticsearch/_all/_settings",
}).then(response => dispatch({type: SET_TOOLS_ANALYZER_LIST, payload: response.data}))

export const setPluginList = () => dispatch => client.call({
    uri: "/elasticsearch/_cat/plugins",
}).then(response => dispatch({type: SET_TOOLS_PLUGIN_LIST, payload: response.data}))

export const actionAnalyzer = (index, data) => dispatch => client.call({
    uri: "/elasticsearch/" + index + "/_analyze",
    method: 'POST',
    data: data
}).then(response => dispatch({type: SET_TOOLS_ANALYZE_BRIEF_RESULT, payload: response.data}))


/* 
    플러그인 이름과 그에 따른 URI규칙이 달라 현재는 이렇게 진행. 
    URI명이 바뀌면 위처럼 바뀔 예정.
    그렇다면 만약에 다른 플러그인이 있다면...?
*/
export const actionPlugin = (plugin, data) => dispatch => client.call({
    // uri: "/elasticsearch/" + plugin + "/analyze",
    uri: "/elasticsearch/_product-name-analysis/analyze-text",
    method: 'POST',
    data: data
}).then(response => dispatch({type: SET_TOOLS_ANALYZE_DETAIL_RESULT, payload: response.data}))