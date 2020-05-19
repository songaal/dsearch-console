import * as types from "../constants";

export function setServerSummary(value) {
    return {
        type: types.SET_SERVER_SUMMARY,
        payload: value
    }
}

