import {
    SET_CAT_INDEX_TEMPLATE_LIST,
    SET_COLLECTION,
    SET_COLLECTION_INDEX_HISTORY_LIST,
    SET_COLLECTION_INDEX_SUFFIX, SET_COLLECTION_JOB,
    SET_COLLECTION_LIST
} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setCollectionList = () => dispatch => client.call({
    uri: "/collections"
}).then(response => dispatch({type: SET_COLLECTION_LIST, payload: response.data}))

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

export const editCollectionScheduleAction = (id, isSchedule) => dispatch => client.call({
    uri: `/collections/${id}`,
    method: "put",
    params: {action: "schedule"},
    data: {
        scheduled: isSchedule
    }
}).then(response => response.data)


export const setIndexHistoryList = ({ indexA, indexB, from, size }) => dispatch => client.call({
    uri: `/elasticsearch/.dsearch_index_history/_search`,
    method: "post",
    params: {
        pretty: true,
        filter_path: "hits"
    },
    data: {
        "query": {
            "bool": {
                "should": [
                    {
                        "match": {
                            "index": {
                                "query": indexA,
                                "boost": 1
                            }
                        }
                    },
                    {
                        "match": {
                            "index": {
                                "query": indexB,
                                "boost": 1
                            }
                        }
                    }
                ],
                "minimum_should_match": 1
            }
        },
        "sort": [
            {
                "startTime": {
                    "order": "desc"
                },
                "_score": {
                    "order": "desc"
                }
            }
        ],
        "from": from,
        "size": size
    }
}).then(response => dispatch({type: SET_COLLECTION_INDEX_HISTORY_LIST, payload: response.data}))

export const deleteIndexHistoryList = ({indexA, indexB, time}) => dispatch => client.call({
    uri: `/elasticsearch/.dsearch_index_history/_delete_by_query`,
    method: 'post',
    data: {
        "query": {
            "bool": {
                "should": [
                    {
                        "match": {
                            "index": {
                                "query": indexA,
                                "boost": 1
                            }
                        }
                    },
                    {
                        "match": {
                            "index": {
                                "query": indexB,
                                "boost": 1
                            }
                        }
                    }
                ],
                "minimum_should_match": 1,
                "filter": {
                    "range": {
                        "startTime": {
                            "lte": time
                        }
                    }
                }
            }
        }
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
    params: { action }
}).then(response => {
    return response.data
})