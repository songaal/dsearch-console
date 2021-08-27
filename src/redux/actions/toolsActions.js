import {
    SET_TOOLS_ANALYZE_BRIEF_RESULT,
    SET_TOOLS_ANALYZE_DETAIL_RESULT,
    SET_TOOLS_ANALYZER_LIST,
    SET_TOOLS_PLUGIN_LIST,
    RESET_TOOLS_RESULTS,
} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setAnalyzerList = () => dispatch => client.call({
    uri: "/elasticsearch/_all/_settings",
}).then(response => dispatch({type: SET_TOOLS_ANALYZER_LIST, payload: response.data}))

export const setPluginList = () => dispatch => client.call({
    // uri: "/elasticsearch/_cat/plugins",
    uri: "/tools/plugins"
}).then(response => dispatch({type: SET_TOOLS_PLUGIN_LIST, payload: response.data}))

export const actionAnalyzer = (index, data) => dispatch => client.call({
    uri: "/elasticsearch/" + index + "/_analyze",
    method: 'POST',
    data: data
}).then(response => dispatch({type: SET_TOOLS_ANALYZE_BRIEF_RESULT, payload: response.data}))

export const actionPlugin = (data) => dispatch => client.call({
    uri: "/tools/detail/analysis",
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    data: data
}).then(response => { dispatch({type: SET_TOOLS_ANALYZE_DETAIL_RESULT, payload: response.data}) } )

export const resetAllResults = (data) => dispatch => dispatch({type: RESET_TOOLS_RESULTS})