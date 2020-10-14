import { combineReducers } from 'redux';

import { uiReducer } from './uiReducer';
import { personaReducer } from './personaReducer';

export const rootReducer = combineReducers({
  ui: uiReducer,
  // TODO: authReducer
  // TODO: SalidaReducer
  persona: personaReducer,
});
