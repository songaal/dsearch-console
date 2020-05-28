import Client from '~/Client'
import {SET_INDEX, SET_INDICES} from "../constants";


const client = new Client()


export const setIndexAction = (index) => dispatch => dispatch({type: SET_INDEX, payload: index})

export const setIndicesAction = () => dispatch =>
    client.call({uri: `/elasticsearch/_cat/indices`,
        params: {
            format: "json",
            h: "index"
        }})
        .then(response => dispatch({type: SET_INDICES, payload: response.data.map(obj => obj.index)}))
        .catch(error => console.error(error))

