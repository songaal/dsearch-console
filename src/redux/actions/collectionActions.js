import {
    SET_CAT_INDEX_TEMPLATE_LIST,
    SET_COLLECTION,
    SET_COLLECTION_INDEX_HISTORY_LIST,
    SET_COLLECTION_INDEX_SUFFIX,
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
    uri: `/elasticsearch/.fastcatx_index_history/_search`,
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
                            "index": indexA
                        }
                    },
                    {
                        "match": {
                            "index": indexB
                        }
                    }
                ]
            }
        },
        "sort": [
            {
                "startTime": {
                    "order": "desc"
                }
            }
        ],
        "from": from,
        "size": size
    }
}).then(response => dispatch({type: SET_COLLECTION_INDEX_HISTORY_LIST, payload: response.data}))

export const deleteIndexHistoryList = ({indexA, indexB, time}) => dispatch => client.call({
    uri: `/elasticsearch/.fastcatx_index_history/_delete_by_query`,
    method: 'post',
    data: {
        "query": {
            "bool": {
                "should": [
                    {
                        "match": {
                            "index": indexA
                        }
                    },
                    {
                        "match": {
                            "index": indexB
                        }
                    }
                ],
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

export const stopPropagation = (id) => dispatch => client.call({
    uri: `/collections/${id}/action`,
    method: "put",
    params: {action: "stop_propagation"}    
}).then(response => response.data)

export const setCollectionActions = (id, action) => dispatch => client.call({
    uri: `/collections/${id}/action`,
    method: "put",
    params: {action: action}    
}).then(response => response.data)

export const getPropagateStatus =  ({indexA, indexB}) => dispatch  => client.call({
    uri: `/elasticsearch/.fastcatx_index_history/_search`,
    method: 'post',
    data: {
        "query": {
            "bool": {
                "minimum_should_match": 1,
                "must": [
                    {
                        "match": {
                            "jobType": "PROPAGATE"
                        }
                    }
                ],
                "must_not": [
                    {
                        "match": {
                            "status": "SUCCESS"
                        }
                    }
                ],
                "should": [
                    {
                        "match": {
                            "index": indexA
                        }
                    },
                    {
                        "match": {
                            "index": indexB
                        }
                    }
                ]
            }
        },
        "sort": [
            {
                "startTime": {
                    "order": "desc"
                }
            }
        ],
        "size": 1,
        "from": 0
    }
}).then(response => dispatch({ type: SET_SEARCH_HISTORY_PROPAGATE_STATUS, payload: response.data }))
