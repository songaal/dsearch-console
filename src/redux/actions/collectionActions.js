import {
    SET_CAT_INDEX_TEMPLATE_LIST,
    SET_COLLECTION,
    SET_COLLECTION_INDEX_HISTORY_LIST,
    SET_COLLECTION_INDEX_SUFFIX,
    SET_COLLECTION_JOB,
    SET_COLLECTION_LIST
} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setCollectionList = () => dispatch => client.call({
    uri: "/collections"
}).then(response => { dispatch({type: SET_COLLECTION_LIST, payload: response.data})} )

export const addCollectionList = (collection) => dispatch => client.call({
    uri: `/collections`,
    method: "POST",
    data: collection
})

export const setCollectionIndexSuffix = () => dispatch => client.call({
    uri: "/collections",
    params: {
        action: "indexSuffix"
    }
}).then(response => dispatch({type: SET_COLLECTION_INDEX_SUFFIX, payload: response.data}))

export const setCollection = id => dispatch => client.call({
    uri: `/collections/${id}`
}).then(response => dispatch({type: SET_COLLECTION, payload: response.data}))

export const deleteCollectionAction = id => dispatch => client.call({
    uri: `/collections/${id}`,
    method: "delete"
})

export const editCollectionSourceAction = (id, collection) => dispatch => client.call({
    uri: `/collections/${id}`,
    method: "put",
    params: {action: "source"},
    data: collection
}).then(response => response.data)

// export const editCollectionScheduleAction = (id, isSchedule) => dispatch => client.call({
//     uri: `/collections/${id}`,
//     method: "put",
//     params: {action: "schedule"},
//     data: {
//         scheduled: isSchedule
//     }
// }).then(response => response.data)

export const editCollectionScheduleAction = (id, collection) => dispatch => client.call({
    uri: `/collections/${id}`,
    method: "put",
    params: {action: "schedule"},
    data: collection
}).then(response => response.data)

export const setIndexHistoryTypeList = ({ indexA, indexB, from, size, type }) => dispatch => client.call({
    uri: `/history`,
    method: "POST",
    data: {
        indexA: indexA,
        indexB: indexB,
        from: from,
        size: size,
        jobType: type
    }
}).then(response => dispatch({type: SET_COLLECTION_INDEX_HISTORY_LIST, payload: response.data}))


export const setIndexHistoryList = ({ indexA, indexB, from, size }) => dispatch => client.call({
    uri: `/history`,
    method: "POST",
    data: {
        indexA: indexA,
        indexB: indexB,
        from: from,
        size: size,
    }
}).then(response => dispatch({type: SET_COLLECTION_INDEX_HISTORY_LIST, payload: response.data}))


export const deleteIndexHistoryList = ({collectionName, time}) => dispatch => client.call({
    uri: `/history` ,
    method: 'DELETE',
    data: {
        "collectionName": collectionName
    }
}).then(response => response.data)


export const setCatIndexTemplateList = () => dispatch => client.call({
    uri: `/elasticsearch/_cat/templates?format=json`
}).then(response => dispatch({type: SET_CAT_INDEX_TEMPLATE_LIST, payload: response.data}))

export const setCollectionJob = id => dispatch => client.call({
    uri: `/collections/${id}/job`
}).then(response => {
    if (response.data) {
        dispatch({ type: SET_COLLECTION_JOB, payload: response.data })
    } else {
        dispatch({ type: SET_COLLECTION_JOB, payload: {} })
    }
    return response.data
})

export const editCollectionAction = (id, action) => dispatch => client.call({
    uri: `/collections/${id}/action`,
    method: 'PUT',
    params: { 
        action
    }
}).then(response => {
    return response.data
})

export const editCollectionAliasAction = (actions) => dispatch => client.call({
    uri: `/elasticsearch/_aliases`,
    method: 'POST',
    data: { actions }
}).then(response => {
    return response.data
})
