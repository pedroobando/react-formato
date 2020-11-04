import { combineReducers } from 'redux';

import { uiReducer } from './uiReducer';
// import { personaReducer } from './personaReducer';
// import { vehiculoReducer } from './vehiculoReducer';
// import { usuarioReducer } from './usuarioReducer';
import { collectionReducer } from './collectionReducer';
import { salidaReducer } from './salidaReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  ordsalida: salidaReducer,
  // persona: personaReducer,
  // vehiculo: vehiculoReducer,
  collection: collectionReducer,
  // usuario: usuarioReducer,
});
