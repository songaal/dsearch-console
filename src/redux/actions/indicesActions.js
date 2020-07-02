import Client from '~/Client'
import {
    SET_INDEX,
    SET_INDEX_ALIASES,
    SET_INDEX_INFO_LIST,
    SET_INDEX_MAPPINGS,
    SET_INDEX_SETTINGS,
    SET_INDICES
} from "../constants";


const client = new Client()


export const setIndexAction = (index) => dispatch => dispatch({type: SET_INDEX, payload: index})

export const setIndicesAction = () => dispatch =>
    client.call({
        uri: `/elasticsearch/_cat/indices`,
        params: {
            format: "json",
        }
    })
        .then(response => dispatch({type: SET_INDICES, payload: response.data}))
        .catch(error => console.error(error))


export const setIndexInfoListAction = (index) => dispatch =>
    client.call({
        uri: `/elasticsearch/_cat/indices/${index}`,
        params: {
            format: "json",
        }
    })
        .then(response => dispatch({type: SET_INDEX_INFO_LIST, payload: response.data}))
        .catch(error => console.error(error))


export const setIndexAliasesAction = (index) => dispatch =>
    client.call({
        uri: `/elasticsearch/${index}/_alias`,
        params: {
            format: "json",
        }
    })
        .then(response => dispatch({type: SET_INDEX_ALIASES, payload: (response.data[index] || {})['aliases']}))
        .catch(error => console.error(error))

export const setIndexSettingsAction = (index) => dispatch =>
    client.call({
        uri: `/elasticsearch/${index}/_settings`,
        params: {
            format: "json",
        }
    })
        .then(response => dispatch({type: SET_INDEX_SETTINGS, payload: (response.data[index] || {})['settings']}))
        .catch(error => console.error(error))

export const setIndexMappingsAction = (index) => dispatch =>
    client.call({
        uri: `/elasticsearch/${index}/_mappings`,
        params: {
            format: "json",
        }
    })
        .then(response => dispatch({type: SET_INDEX_MAPPINGS, payload: (response.data[index] || {})['mappings']}))
        .catch(error => console.error(error))

