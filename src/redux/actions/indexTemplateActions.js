import Client from '~/Client'
import {SET_INDEX_TEMPLATE, SET_INDEX_TEMPLATES, SET_COMMENTS} from "../constants";

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

export const deleteIndexTemplateAction = ({template}) => dispatch => client.call({
    uri: `/elasticsearch/_template/${template}`,
    method: "DELETE",
})

export const setIndexTemplateAction = ({ template }) => dispatch => client.call({
    uri: `/elasticsearch/_template/${template}`
}).then(response => dispatch({type: SET_INDEX_TEMPLATE, payload: response.data[template]}))


export const setIndexTemplateCommentsAction = () => dispatch => client.call({
    uri: `/templates/comments`,
    method: "GET",
}).then(response => {
    if(response.data == undefined || response.data.hits == undefined || response.data.hits.hits.length === 0){
        dispatch({type: SET_COMMENTS, payload: []})
    }else{
        let list = response.data.hits.hits.map((item) => {
            return item;
        })
        
        console.log(list)
        dispatch({type: SET_COMMENTS, payload: list})
    }
    
})

export const addCommentsAction = ({id, name, updatedComment}) => dispatch => client.call({
    uri: `/templates/comments`,
    method: "PUT",
    data: {
        "name": name,
        "id": id,
        "data": updatedComment
    }
})