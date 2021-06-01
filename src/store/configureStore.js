import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// const configureStore = (initialState) => {
// 	const sagaMiddleware = createSagaMiddleware();
// 	const middlewares = [sagaMiddleware];
// 	const enhancer = process.env.NODE_ENV === 'production' ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares));
// 	const store = createStore(rootReducer, initialState, enhancer);
// 	// store.sagaTask = sagaMiddleware.run(rootReducer);
// 	return store;
// };

const enhancer = process.env.NODE_ENV === 'production' ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares));
export const configureStore = createStore(rootReducer, enhancer);

configureStore.sagaTask = sagaMiddleware.run(rootSaga);

export default configureStore;
