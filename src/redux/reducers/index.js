import {combineReducers} from 'redux';
// Reducer importing..
import indicesReducers from "./indicesReducers";
import dictionaryReducers from "./dictionaryReducers";
import clusterReducers from "./clusterReducers";
import indicesMappingReducers from "./indicesMappingReducers";
import serverSummaryReducers from "./serverSummaryReducers";
import apiManagementReducers from "./apiManagementReducers";
import clusterInfoReducers from "./clusterInfoReducers";
import indicesIndexDataReducers from "./indicesIndexDataReducers";
import dashBoardReducers from "./dashBoardReducers";
import referenceSearchReducers from "./referenceSearchReducers";
import indexTemplateReducers from "./indexTemplateReducers";

export default combineReducers({
    indicesReducers,
    dictionaryReducers,
    clusterReducers,
    indicesMappingReducers,
    serverSummaryReducers,
    apiManagementReducers,
    clusterInfoReducers,
    indicesIndexDataReducers,
    dashBoardReducers,
    referenceSearchReducers,
    indexTemplateReducers,
});
