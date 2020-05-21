import * as types from "../constants";

export function setApiManagementActions(value) {
    return new Promise(function(resolve, reject) {
        resolve(() => {
            reject({
                type: types.SET_API_MANAGEMENT,
                payload: value
            })
        }, 1000)
    })
}

