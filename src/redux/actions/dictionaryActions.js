import Client from '~/Client'
import * as types from "../constants";
import { ChildFriendlyTwoTone } from '@material-ui/icons';

const client = new Client()

export const setActiveSettingIndex = (activeIndex) => dispatch => dispatch({type: types.SET_ACTIVE_SETTING_INDEX, payload: activeIndex})

export const setSettings = () => dispatch =>
    client.call({
        uri: `/dictionaries/settings`
    })
        .then(response => dispatch({type: types.SET_SETTING_DICTIONARIES, payload: response.data}))
        .catch(error => console.error(error))

export const setDictionary = (dictionary, pageNum, rowSize, isMatch, value, searchColumns) => dispatch =>
    client.call({
        uri: `/dictionaries/${dictionary}`,
        params: {pageNum, rowSize, isMatch, value, searchColumns}
    })
        .then(response => dispatch({type: types.SET_DICTIONARY_DATASET, dictionary: dictionary, payload: response.data}))
        .catch(error => console.error(error))

export const downloadDictionary = (dictionary) =>
    client.call({
        uri: `/dictionaries/${dictionary}/download`,
        responseType: 'blob'
    })
        .then(response => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(new Blob([response.data], {
                type: response.headers['content-type']
            }));
            link.setAttribute('download', `${dictionary}.txt`);
            document.body.appendChild(link);
            link.click();
        })

export const deleteDictionary = (dictionary, id) =>
    client.call({
        uri: `/dictionaries/${dictionary}/${id}`,
        method: "DELETE"
    })

export const createDictionary = (dictionary, data) =>
    client.call({
        uri: `/dictionaries/${dictionary}`,
        method: "POST",
        data: data
    })
        .then(response => {
            console.log(response)
        })
        .catch(error => console.error(error))

export const updateDictionary = (dictionary, id, data) =>
    client.call({
        uri: `/dictionaries/${dictionary}/${id}`,
        method: "PUT",
        data: data
    })
        .then(response => {
            console.log(response)
        })
        .catch(error => console.error(error))

export const searchDictionaries = (data) => dispatch => client.call({
    uri: "/elasticsearch/_analysis-product-name/find-dict",
    method: "POST",
    data: data
}).then(response => dispatch({type: types.SET_DICTIONARY_SEARCH_LIST , payload: response.data}))



export const setSummary = () => dispatch => client.call({
    uri: "/dictionaries/summary",
}).then(response => dispatch({type: types.SET_SUMMARY , payload: response.data}))

export const setDictionaryIndexSettings = () => dispatch => client.call({
    uri: "/elasticsearch/.fastcatx_dict/_settings",
}).then(response => dispatch({type: types.SET_DICTIONARY_INDEX_SETTINGS , payload: response.data}))


export const setInfoDict = () => dispatch => client.call({
    uri: "/elasticsearch/_analysis-product-name/info-dict"
}).then(response => dispatch({type: types.SET_DICTIONARY_INFO , payload: response.data.dictionary}))


export const applyDictionary = (data) => dispatch => client.call({
    uri: "/elasticsearch/_analysis-product-name/compile-dict",
    method: "POST",
    data: data
}).then(response => dispatch({type: types.SET_DICTIONARY}))

export const setDictionaryIndexDate =() => dispatch => client.call({
    uri: "/elasticsearch/.fastcatx_dict/_search",
    method: "POST",
    data: {
        "size": 1,
        "sort": [
              { "updatedTime": "desc" }
          ]
      }
}).then(response => dispatch({type: types.SET_DICTIONARY_INDEX_DATE , payload: response.data}))
