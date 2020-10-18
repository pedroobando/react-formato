import { combineReducers } from 'redux';

import { uiReducer } from './uiReducer';
import { personaReducer } from './personaReducer';
import { vehiculoReducer } from './vehiculoReducer';
import { usuarioReducer } from './usuarioReducer';

export const rootReducer = combineReducers({
  ui: uiReducer,
  // TODO: authReducer
  // TODO: SalidaReducer

  persona: personaReducer,
  vehiculo: vehiculoReducer,
  usuario: usuarioReducer,
});
