import { combineReducers } from 'redux';

// Reducer importing..
import themeReducer from './themeReducers';
import dictionaryReducers from "./dictionaryReducers";

export default combineReducers({
	themeReducer,
	dictionaryReducers
});
