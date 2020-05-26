import {combineReducers} from 'redux';
// Reducer importing..
import indicesReducers from "./indicesReducers";
import dictionaryReducers from "./dictionaryReducers";
import clusterReducers from "./clusterReducers";
import indicesMappingReducers from "./indicesMappingReducers";
import serverSummaryReducers from "./serverSummaryReducers";
import apiManagementReducers from "./apiManagementReducers";
import indicesIndexDataReducers from "./indicesIndexDataReducers";


export default combineReducers({
    indicesReducers,
    dictionaryReducers,
    clusterReducers,
    indicesMappingReducers,
    serverSummaryReducers,
    apiManagementReducers,
    indicesIndexDataReducers,
});
