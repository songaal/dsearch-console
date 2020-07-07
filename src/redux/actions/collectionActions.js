import {SET_COLLECTION, SET_COLLECTION_INDEX_SUFFIX, SET_COLLECTION_LIST} from "../constants";
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