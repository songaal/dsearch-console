import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/index';
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';


let StoreEnhancer
if (process.env.NODE_ENV !== "production") {
    StoreEnhancer = composeWithDevTools(
        applyMiddleware(
            ReduxThunk,
        )
    )
} else {
    StoreEnhancer = applyMiddleware(
        ReduxThunk,
    )
}

const store = createStore(
    rootReducer,
    StoreEnhancer
);

export default store;

