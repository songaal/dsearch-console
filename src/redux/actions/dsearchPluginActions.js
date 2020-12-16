import Client from '~/Client'
import {
  SET_PLUGIN_KEYWORD,
  SET_AUTOCOMPLETE_URL
} from "../constants";
// import { PostAdd } from '@material-ui/icons';

const client = new Client()

export const setAutoCompleteStoreAction = (keyword) => dispatch =>
    client.call({
        uri: `/reference/autocomplete?` + encodeURIComponent(keyword)
    }).then(response => {
      dispatch({type: SET_PLUGIN_KEYWORD, payload: response.data})
    })
      .catch(error => console.error(error))

export const setAutoCompleteAction = (keyword) => dispatch =>
      client.call({
          uri: `/reference/autocomplete?` + encodeURIComponent(keyword)
      })

export const setAutoCompleteURLAction = (url) => dispatch =>
  client.call({
    uri: `/reference/save/autocomplete`,
    method: "POST",
    data: url
  }).then(response =>{
    console.log(response)
    dispatch({type: SET_AUTOCOMPLETE_URL, payload: response.data})}).catch((err) => { console.log(err) })

export const getAutoCompleteURLAction = () => dispatch =>
  client.call({
    uri: `/reference/get/autocomplete`,
    method: "GET"
  }).then(response =>{
    dispatch({type: SET_AUTOCOMPLETE_URL, payload: response.data})}).catch((err) => { console.log(err) })