/**
 * Created by wenbinzhang on 2017/5/4.
 */
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReduce from '../reducers';
import rootSaga from '../Sagas/index'

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  rootReduce,
  applyMiddleware(createLogger({
    stateTransformer: state => JSON.stringify(state)
  }), sagaMiddleware)
);

sagaMiddleware.run(rootSaga);