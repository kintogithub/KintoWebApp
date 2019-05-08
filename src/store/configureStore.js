import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import immutableCheckMiddleWare from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import getInitialState from './getInitialState'

import rootReducer from '../reducers'

const applyedMiddleware = history => {
  const middleware = [thunk]
  middleware.push(routerMiddleware(history))
  if (process.env.NODE_ENV === 'development') {
    middleware.push(immutableCheckMiddleWare())
  }
  // should always be last
  if (process.env.NODE_ENV === 'development') {
    const loggerMiddleware = createLogger({ collapsed: true })
    middleware.push(loggerMiddleware)
  }
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  return composeEnhancers(applyMiddleware(...middleware))
}

export default history =>
  createStore(rootReducer, getInitialState(), applyedMiddleware(history))
