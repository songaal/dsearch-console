import {combineReducers} from 'redux';
// Reducer importing..
import dictionaryReducers from "./dictionaryReducers";
import clusterReducers from "./clusterReducers";

export default combineReducers({
    dictionaryReducers,
    clusterReducers,
});
