import Client from '~/Client'
import {
  SET_PLUGIN_KEYWORD
} from "../constants";

const client = new Client()

export const setAutoCompleteStoreAction = (keyword) => dispatch =>
    client.call({
        uri: `/elasticsearch/_dsearch/_all?q=` + encodeURIComponent(keyword)
    }).then(response => {
      dispatch({type: SET_PLUGIN_KEYWORD, payload: response.data})
    })
      .catch(error => console.error(error))

export const setAutoCompleteAction = (keyword) => dispatch =>
      client.call({
          uri: `/elasticsearch/_dsearch/_all?q=` + encodeURIComponent(keyword)
      })