import {combineReducers} from 'redux';
// Reducer importing..
import dictionaryReducers from "./dictionaryReducers";
import clusterReducers from "./clusterReducers";
import indicesMappingReducers from "./indicesMappingReducers";
import serverSummaryReducers from "./serverSummaryReducers";
import apiManagementReducers from "./apiManagementReducers";

export default combineReducers({
    dictionaryReducers,
    clusterReducers,
    indicesMappingReducers,
    serverSummaryReducers,
    apiManagementReducers,
});
