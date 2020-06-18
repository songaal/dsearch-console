import Client from '~/Client'
import {SET_INDEX_TEMPLATES, SET_INDEX_TEMPLATE} from "../constants";

const client = new Client()

export const setIndexTemplatesAction = () => dispatch => client.call({
    uri: '/elasticsearch/_cat/templates?format=json'
}).then(response => dispatch({
    type: SET_INDEX_TEMPLATES,
    payload: response.data.filter(template => !template['name'].startsWith("."))
}))


export const addIndexTemplateAction = ({template, index_patterns, settings, mappings}) => dispatch => client.call({
    uri: `/elasticsearch/_template/${template}`,
    method: "PUT",
    data: {
        index_patterns,
        settings,
        mappings
    }
})

export const setIndexTemplateAction = ({ template }) => dispatch => client.call({
    uri: `/elasticsearch/_template/${template}`
}).then(response => dispatch({type: SET_INDEX_TEMPLATE, payload: response.data[template]}))