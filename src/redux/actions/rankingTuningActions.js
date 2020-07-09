import {SET_RANKING_TUNING_DOCUMENT} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setDocumentList = (data) => dispatch => client.call({
    uri: "/rankingtuning/",
    method: 'POST',
    data: data
}).then(response => dispatch({type: SET_RANKING_TUNING_DOCUMENT, payload: response.data}))


// export const setDocumentList = (index, data) => dispatch => client.call({
//     uri: "/elasticsearch/"+ index+ "/_search",
//     method: 'POST',
//     data: data
// }).then(response => dispatch({type: SET_RANKING_TUNING_DOCUMENT, payload: response.data}))