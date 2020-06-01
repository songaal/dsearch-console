import Client from '~/Client'
import { SET_DICTIONARY_USER } from "../constants";

const client = new Client()

export const setDictionaryUser = (pageNum, rowSize, field, value) => dispatch => client.call({
    uri: `/dictionaries/user`,
    params: {
        pageNum: pageNum,
        rowSize: rowSize,
        field: field,
        value: value
    }
}).then(response => dispatch({type: SET_DICTIONARY_USER, payload: response.data}))
    .catch(error => console.error(error))


export const downloadDictionaryUser = () => client.call({uri: `/dictionaries/user/download`,  responseType: 'blob'})
    .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'user.txt');
        document.body.appendChild(link);
        link.click();
    })