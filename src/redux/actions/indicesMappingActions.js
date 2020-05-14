import * as types from "../constants";

export function setIndicesMapping(value) {
    return {
        type: types.SET_INDICES_MAPPING,
        payload: value
    }
}

