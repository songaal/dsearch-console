import  {
    SET_REFERENCE_SEARCH_KEYWORD,
    SET_REFERENCE_TEMPLATE_LIST,
    SET_REFERENCE_TEMPLATE,
} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setReferenceTemplateList = () => dispatch => client.call({uri: '/reference'})
    .then(response => dispatch({type: SET_REFERENCE_TEMPLATE_LIST, payload: response.data}))
    .catch(err => console.error(err))

export const addReferenceTemplate = (template) => dispatch => client.call({
    uri: '/reference', method: 'POST', data: template
}).then(response => dispatch({type: SET_REFERENCE_TEMPLATE, payload: response.data}))
    .catch(err => console.error(err))

export const updateReferenceTemplate = (id, template) => dispatch => client.call({
    uri: `/reference/${id}`, method: 'PUT', data: template
}).then(response => dispatch({type: SET_REFERENCE_TEMPLATE, payload: response.data}))
    .catch(err => console.error(err))

export const deleteReferenceTemplate = (id) => dispatch => client.call({
    uri: `/reference/${id}`, method: 'DELETE'
}).then(() => dispatch({type: SET_REFERENCE_TEMPLATE, payload: {}}))
    .catch(err => console.error(err))

export const actionReferenceTemplate = (action, data) => dispatch => client.call({
    uri: `/reference/actions`,
    method: 'PUT',
    params: {action: action},
    data: data,
}).then(() => dispatch({type: SET_REFERENCE_TEMPLATE, payload: {}}))
    .catch(err => console.error(err))
