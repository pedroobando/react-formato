import { combineReducers } from 'redux';

import { uiReducer } from './uiReducer';
import { personaReducer } from './personaReducer';
import { vehiculoReducer } from './vehiculoReducer';
import { usuarioReducer } from './usuarioReducer';
import { departamentoReducer } from './departamentoReducer';

export const rootReducer = combineReducers({
  ui: uiReducer,
  // TODO: authReducer
  // TODO: SalidaReducer

  persona: personaReducer,
  vehiculo: vehiculoReducer,
  departamento: departamentoReducer,
  usuario: usuarioReducer,
});
