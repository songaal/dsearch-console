import Client from '~/Client'
import * as types from "../constants";

const client = new Client()



export const setActiveSettingIndex = (activeIndex) => dispatch => dispatch({type: types.SET_ACTIVE_SETTING_INDEX, payload: activeIndex})

export const setSettings = () => dispatch =>
    client.call({
        uri: `/dictionaries/settings`
    })
        .then(response => {
                let settings = response.data;
                dispatch({type: types.SET_SETTING_DICTIONARIES, payload: settings.sort((a, b)=> a.index - b.index)})

                //원본
                // dispatch({type: types.SET_SETTING_DICTIONARIES, payload: response.data})
            }
        )
        .catch(error => console.error(error))

export const updatedSettingList = (newSettings) => dispatch =>  client.call({
    uri: `/dictionaries/settings/updateList`,
    method: "POST",
    data: newSettings
}).then((response)=>{
    // console.log(response)
}).catch((err) => {
    console.log(err)
});

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
        headers: {'Content-type': 'application/json'},
        method: "POST",
        data: data
    })
        .then(response => {
            // console.log(response)
        })
        .catch(error => console.error(error))

export const updateDictionary = (dictionary, id, data) =>
    client.call({
        uri: `/dictionaries/${dictionary}/${id}`,
        headers: {'Content-type': 'application/json'},
        method: "PUT",
        data: data
    })
        .then(response => {
            // console.log(response)
        })
        .catch(error => console.error(error))


export const searchDictionaries = (data) => dispatch => client.call({
    uri: "/dictionaries/find-dict",
    method: "POST",
    headers: {'Content-type': 'application/json'},
    data: data
}).then(response => dispatch({type: types.SET_DICTIONARY_SEARCH_LIST , payload: response.data}))

export const setSummary = () => dispatch => client.call({
    uri: "/dictionaries/summary",
}).then(response => { dispatch({type: types.SET_SUMMARY , payload: response.data})} )


export const applyDictionary = (data) => dispatch => client.call({
    uri: "/dictionaries/compile-dict",
    method: "POST",
    headers: {'Content-type': 'application/json'},
    data: data
}).then(response => dispatch({type: types.SET_DICTIONARY, payload: response.data}))

export const setAddDictionarySetting = ({id, name, type, tokenType, ignoreCase, columns_id, columns_keyword, columns_value}) => dispatch => client.call({
    uri: "/dictionaries/settings",
    method: "POST",
    data: {
        id, name, type, tokenType, ignoreCase,
        columns: [
            columns_id.length > 0 ? {
                    type: "id",
                    label: columns_id
                }
                :
                null,
            columns_keyword.length > 0 ? {
                    type: "keyword",
                    label: columns_keyword
                }
                :
                null,
            columns_value.length > 0 ? {
                    type: "value",
                    label: columns_value
                }
                :
                null,
        ]
    }
}).then(response => response.data)

export const removeDictionarySetting = id => dispatch => client.call({
    uri: "/dictionaries/settings/" + id,
    method: "DELETE"
}).then(response => response.data)

export const setRemoteCluster = () => dispatch =>
    client.call({
        uri: `/dictionaries/remote`
    })
        .then(response => response.data)
        .catch(error => console.error(error))


export const sendFile = (fd) => dispatch => client.call({
     uri: `/dictionaries/fileUpload`, 
     method: "POST", 
     data: fd,
     headers: {
        "Content-type": "multipart/form-data",
     }
    })


export const resetDict = (fd) => dispatch => client.call({
        uri: `/dictionaries/resetDict`, 
        method: "POST", 
        data: fd,
    })