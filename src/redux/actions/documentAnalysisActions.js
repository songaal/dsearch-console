import { READ_SEARCH_QUERYS, CREATE_SEARCH_QUERY, DELETE_SEARCH_QUERY, UPDATE_SEARCH_QUERY, ANALYSIS_DOCUMENT } from "../constants";
import Client from '~/Client'

const client = new Client()

export const getSearchQueryList = (data) => dispatch => client.call({
    uri: "/document/searchQuery",
    method: 'GET'
}).then(response => {
    dispatch({type: READ_SEARCH_QUERYS, payload: response.data});})


export const createSearchQuery = (data) => dispatch => client.call({
    uri: "/document/searchQuery",
    method: 'POST',
    data: data
}).then(response => dispatch({type: CREATE_SEARCH_QUERY, payload: response.data}))


export const deleteSearchQeury = (id) => dispatch => client.call({
    uri: `/document/searchQuery?id=${id}`,
    method: 'DELETE',
}).then(response => dispatch({type: DELETE_SEARCH_QUERY, payload: response.data}))

export const updateSearchQuery = (data) => dispatch => client.call({
    uri: "/document/searchQuery",
    method: 'PUT',
    data: data
}).then(response => dispatch({type: UPDATE_SEARCH_QUERY, payload: response.data}))



export const analyzeDocument = (data) => dispatch => client.call({
    uri: "/document/analysis",
    method: 'POST',
    data: data
}).then(response => dispatch({type: ANALYSIS_DOCUMENT, payload: response.data}))


// export const setDocumentList = (index, data) => dispatch => client.call({
//     uri: "/elasticsearch/"+ index+ "/_search",
//     method: 'POST',
//     data: data
// }).then(response => dispatch({type: SET_RANKING_TUNING_DOCUMENT, payload: response.data}))