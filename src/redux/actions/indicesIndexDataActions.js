import { SET_INDICES_DATA_LIST } from "../constants";
import Client from '~/Client'

const client = new Client()

export const setIndicesDataListActions = (indices, from, id) => dispatch =>
    client.call({
        uri: `/indices/${indices}/_docs`,
        params: {format: "json", from: from, id: id}
    })
        .then(response => dispatch({
            type: SET_INDICES_DATA_LIST,
            [SET_INDICES_DATA_LIST]: { indices, from, id },
            payload: response.data}))
        .catch(err => console.error(err))



