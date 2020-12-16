import { SET_INDEX_RESULT, SET_RUNNING_INDEX, SET_INDEX_STATUS, SET_INDEX_ALIAS, SET_DASHBOARD_INDICES_INFO } from "../constants";
import Client from '~/Client'

const client = new Client()

export const setIndexResultActions = key => dispatch => client.call({
  uri: `/elasticsearch/.dsearch_index_history/_search`,
  method: 'post',
  data: {
    "query": {
      "bool": {
        "minimum_should_match": 1,
        "should": [
          {
            "term": {
              "jobType": "FULL_INDEX"
            }
          },
          {
            "term": {
              "jobType.keyword": "FULL_INDEX"
            }
          }
        ]
      }
    },
    "sort": [
      {
        "endTime": {
          "order": "desc"
        }
      }
    ],
    "size" : 50
    // ,
    // collapse: {
    //   field: "index",
    //   inner_hits: {
    //     name: "_bundle",
    //     size: 0
    //   }
    // }
  }
})
  .then(response => dispatch({ type: SET_INDEX_RESULT, payload: response.data }))
  .catch(err => console.error(err))

// export const setRunningIndexActions = key => dispatch => client.call({uri: `/elasticsearch/.dsearch_last_index_status/_search?q=status:RUNNING`})
//     .then(response => dispatch({type: SET_RUNNING_INDEX, payload: response.data}))
//     .catch(err => console.error(err))

export const setIndexStatusActions = key => dispatch => client.call({ uri: `/elasticsearch/_cat/indices?format=json` })
  .then(response => dispatch({ type: SET_INDEX_STATUS, payload: response.data }))
  .catch(err => console.error(err))


export const setIndexAliasActions = key => dispatch => client.call({ uri: `/elasticsearch/_cat/aliases?format=json` })
  .then(response => dispatch({ type: SET_INDEX_ALIAS, payload: response.data }))
  .catch(err => console.error(err))

export const setRunningIndexActions = key => dispatch => client.call({ uri: `/dashboard/indexing` })
  .then(response => dispatch({ type: SET_RUNNING_INDEX, payload: response.data }) )
  .catch(err => console.error(err))

export const setIndicesActions = () => dispatch =>
  client.call({
    uri: `/elasticsearch/_cat/indices`,
    params: {
      format: "json",
    }
  })
    .then(response => dispatch({ type: SET_DASHBOARD_INDICES_INFO, payload: response.data }))
    .catch(error => console.error(error))


export const setRunningPropagateIndexActions = (index) => dispatch => client.call({ uri: `/elasticsearch/${index}/_recovery?format=json&filter_path=**.shards.index.size.percent` })