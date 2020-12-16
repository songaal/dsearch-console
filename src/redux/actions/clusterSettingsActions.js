import { SET_CLUSTER_SETTINGS, SET_DSEARCH_SETTINGS } from "../constants";
import Client from '~/Client'

const client = new Client()

export const setClusterSettingsAction = () => dispatch => client.call({
    uri: `/elasticsearch/_cluster/settings?include_defaults=true&flat_settings=true`
})
    .then(response => dispatch({ type: SET_CLUSTER_SETTINGS, payload: response.data }))
    .catch(err => console.error(err))


export const getDsearchSettingsAction = () => dispatch => client.call({
    uri: `/collections/getSettings`
})
    .then(response => { dispatch({ type: SET_DSEARCH_SETTINGS, payload: response.data }); })
    .catch(err => console.error(err))

export const setDsearchSettingsAction = (type, content) => dispatch => client.call({
    uri: `/collections/setSettings?type=${type}`,
    method: "POST",
    data: content
}).catch(err => console.error(err))
