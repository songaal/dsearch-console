import {combineReducers} from 'redux';
// Reducer importing..
import indicesReducers from "./indicesReducers";
import dictionaryReducers from "./dictionaryReducers";
import clusterReducers from "./clusterReducers";
import indicesMappingReducers from "./indicesMappingReducers";
import serverSummaryReducers from "./serverSummaryReducers";
import apiManagementReducers from "./apiManagementReducers";
import clusterInfoReducers from "./clusterInfoReducers";
import dashBoardReducers from "./dashBoardReducers";
import referenceSearchReducers from "./referenceSearchReducers";
import indexTemplateReducers from "./indexTemplateReducers";
import dsearchReducers from "./dsearchReducers";
import roleManagementReducers from "./roleManagementReducers";
import userManagementReducers from "./userManagementReducers";
import clusterSettingsReducers from "./clusterSettingsReducers";
import collectionReducers from "./collectionReducers";
import toolsReducers from "./toolsReducers";
import rankingTuningReducers from "./rankingTuningReducers"
import jdbcReducers from "./jdbcReducers"
import dsearchPluginReducers from "./dsearchPluginReducers"
import pipelineReducers from "./pipelineReducers"
import dynamicReducers from "./dynamicReducers"

export default combineReducers({
    indicesReducers,
    dictionaryReducers,
    clusterReducers,
    indicesMappingReducers,
    serverSummaryReducers,
    apiManagementReducers,
    clusterInfoReducers,
    dashBoardReducers,
    referenceSearchReducers,
    indexTemplateReducers,
    dsearchReducers,
    roleManagementReducers,
    userManagementReducers,
    clusterSettingsReducers,
    collectionReducers,
    toolsReducers,
    rankingTuningReducers,
    jdbcReducers,
    dsearchPluginReducers,
    pipelineReducers,
    dynamicReducers
});
