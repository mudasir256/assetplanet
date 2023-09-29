import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import reducers from './reducers';
import thunk from "redux-thunk";
import rootReducer from './rootReducer';
import sagas from "./sagas";
import logger from "redux-logger"

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware,thunk,logger];

export function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        reducers,
        
        initialState,
        composeEnhancers(
            applyMiddleware(...middlewares)
        ),
    );
    sagaMiddleware.run(sagas);
    return store;
}
