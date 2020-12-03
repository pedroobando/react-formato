import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from '../reducers/rootReducer';

// Only Dev
// const composeEnhancers =
//   (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;
// export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// Only Prod
export const store = createStore(rootReducer, applyMiddleware(thunk));
