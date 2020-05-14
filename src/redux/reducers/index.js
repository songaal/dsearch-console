import {combineReducers} from 'redux';
// Reducer importing..
import dictionaryReducers from "./dictionaryReducers";
import clusterReducers from "./clusterReducers";
import indicesMappingReducers from "./indicesMappingReducers";

export default combineReducers({
    dictionaryReducers,
    clusterReducers,
    indicesMappingReducers,
});
