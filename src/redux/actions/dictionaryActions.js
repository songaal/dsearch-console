import Client from '~/Client'
import * as types from "../constants";

const client = new Client()


// 1) 사용자사전
// 2) 유사어사전
// 3) 분리어사전
// 4) 영단어사전
// 5) 단위명사전
// 6) 단위명동의사전
// 7) 불용어사전
// 8) 제조사명사전
// 9) 브랜드명사전
// 10) 카테고리키워드사전
// 11) 복합명사사전

function sortTabs(dictTabs){
    let tabs = [];
    let indexList = [];
    
    // 없으면 -1, 있으면 인덱스 위치 반환
    let idx = dictTabs.findIndex(item => item.name == "사용자 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }
    
    idx = dictTabs.findIndex(item => item.name == "유사어 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.name == "분리어 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.name == "영단어 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.name == "단위명 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.name == "단위명동의어 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.name == "불용어 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.name == "제조사명 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.name == "브랜드명 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.name == "카테고리키워드사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.name == "복합명사 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }
    
    dictTabs.map((item, index) => {
        let flag = indexList.findIndex(i => i == index);
        if(flag == -1) tabs.push(item);
    })

    return tabs;
}

export const setActiveSettingIndex = (activeIndex) => dispatch => dispatch({type: types.SET_ACTIVE_SETTING_INDEX, payload: activeIndex})

export const setSettings = () => dispatch =>
    client.call({
        uri: `/dictionaries/settings`
    })
        .then(response => {
                let settings = response.data;
                dispatch({type: types.SET_SETTING_DICTIONARIES, payload: sortTabs(settings)})

                //원본
                // dispatch({type: types.SET_SETTING_DICTIONARIES, payload: response.data})
            }
        )
        .catch(error => console.error(error))

// export const sortSettings = (settings) => dispatch =>  dispatch({type: types.SET_SETTING_DICTIONARIES, payload: settings})

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
    uri: "/dictionaries/find-dict",
    method: "POST",
    data: data
}).then(response => dispatch({type: types.SET_DICTIONARY_SEARCH_LIST , payload: response.data}))

export const setSummary = () => dispatch => client.call({
    uri: "/dictionaries/summary",
}).then(response => dispatch({type: types.SET_SUMMARY , payload: response.data}))


export const applyDictionary = (data) => dispatch => client.call({
    uri: "/dictionaries/compile-dict",
    method: "POST",
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
