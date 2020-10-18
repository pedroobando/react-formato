import { combineReducers } from 'redux';

import { uiReducer } from './uiReducer';
import { personaReducer } from './personaReducer';
import { vehiculoReducer } from './vehiculoReducer';

export const rootReducer = combineReducers({
  ui: uiReducer,
  // TODO: authReducer
  // TODO: SalidaReducer
  vehiculo: vehiculoReducer,
  persona: personaReducer,
});
