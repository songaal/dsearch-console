import Client from '~/Client'
import * as types from "../constants";

const client = new Client()

export const setDictionary = (type, pageNum, rowSize, isMatch, value) => dispatch => client.call({
    uri: `/dictionaries/${type}`,
    params: {pageNum, rowSize, isMatch, value}
}).then(response => dispatch({type: types[`SET_DICTIONARY_${type.toUpperCase()}`], payload: response.data}))
    .catch(error => console.error(error))

export const downloadDictionary = (type) => client.call({uri: `/dictionaries/${type}/download`,  responseType: 'blob'})
    .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${type}.txt`);
        document.body.appendChild(link);
        link.click();
    })

export const deleteDictionary = (type, id) => client.call({uri: `/dictionaries/${type}/${id}`,  method: "delete"})

export const createDictionary = (type, data) => client.call({uri: `/dictionaries/${type}`,  method: "post", data: data})