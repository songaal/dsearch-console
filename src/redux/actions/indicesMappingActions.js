import * as types from "../constants";
import Client from '~/Client'

const client = new Client()

// export function setIndicesMapping(value) {
//     return {
//         type: types.SET_INDICES_MAPPING,
//         payload: value
//     }
// }

export const setIndexMappingAction = ({index, reset}) => dispatch =>
    reset ? dispatch({type: types.SET_INDEX_MAPPING, payload: {}}) : client.call({index: index})
        .then(res => dispatch({type: types.SET_INDEX_MAPPING, payload: res.data}))
        .catch(error => console.error(error))
