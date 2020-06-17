import Client from '~/Client'
import * as types from "../constants";

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
