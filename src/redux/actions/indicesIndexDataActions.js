import {SET_INDICES_SOURCE_DATA_LIST} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setIndicesSourceDataListActions = (params) => dispatch =>
    client.call({
        uri: `/indices/${params.index}/_docs`,
        params: params
    }).then(response => dispatch({
        type: SET_INDICES_SOURCE_DATA_LIST,
        params: params,
        payload: response.data.hits.hits,
    })).catch(err => console.error(err))