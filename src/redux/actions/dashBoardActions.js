import {SET_INDEX_RESULT,SET_RUNNING_INDEX,SET_INDEX_STATUS,SET_INDEX_ALIAS} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setIndexResultActions = key => dispatch => client.call({uri: `/elasticsearch/.fastcatx_index_history/_search`,
        method:'post',
        data: {
         
            sort: [
                {
                  endTime: {
                    order: "desc"
                  }
                }
              ], 
               collapse: {
                field : "index",
                inner_hits : {
                      name: "_bundle",
                      size: 0
                  }
                }
        }
    })
    .then(response => dispatch({type: SET_INDEX_RESULT, payload: response.data}))
    .catch(err => console.error(err))

// export const setRunningIndexActions = key => dispatch => client.call({uri: `/elasticsearch/.fastcatx_last_index_status/_search?q=status:RUNNING`})
//     .then(response => dispatch({type: SET_RUNNING_INDEX, payload: response.data}))
//     .catch(err => console.error(err))

export const setIndexStatusActions = key => dispatch => client.call({uri: `/elasticsearch/_cat/indices?format=json`})
    .then(response => dispatch({type: SET_INDEX_STATUS, payload: response.data}))
    .catch(err => console.error(err))


export const setIndexAliasActions = key => dispatch => client.call({uri: `/elasticsearch/_cat/aliases?format=json`})
    .then(response => dispatch({type: SET_INDEX_ALIAS, payload: response.data}))
    .catch(err => console.error(err))

export const setRunningIndexActions = key => dispatch => client.call({uri: `/collections/indexing`})
  .then(response => dispatch({type: SET_RUNNING_INDEX, payload: response.data}))
  .catch(err => console.error(err))