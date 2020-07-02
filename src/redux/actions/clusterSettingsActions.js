import {SET_API_MANAGEMENT, SET_CLUSTER_SETTINGS} from "../constants";
import Client from '~/Client'

const client = new Client()

export const setClusterSettingsAction = () => dispatch => client.call({
    uri: `/elasticsearch/_cluster/settings?include_defaults=true&flat_settings=true`
})
    .then(response => dispatch({type: SET_CLUSTER_SETTINGS, payload: response.data}))
    .catch(err => console.error(err))


