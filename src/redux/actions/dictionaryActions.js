import * as types from "../constants";

export function setDictionaryUserList(value) {
    return {
        type: types.SET_DICTIONARY_USER_LIST,
        payload: value
    }
}
