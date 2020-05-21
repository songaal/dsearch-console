import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/index';
import promiseMiddleware from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            promiseMiddleware,
        ),
    )
);

export default store;
