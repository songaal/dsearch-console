import * as types from "../constants";
import Client from '~/Client'

const client = new Client()

export const setIndicesDataAction = ({index, pageNum, rowSize, id}) => dispatch => client.call({
    uri: `/indices/${index}/_docs`,
    params: {
        index,
        pageNum,
        rowSize,
        id
    }
}).then(response => dispatch({
    type: types.SET_INDICES_DATA,
    payload: response.data,
})).catch(err => console.error(err))
