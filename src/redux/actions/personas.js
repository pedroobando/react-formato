import { typePersona } from '../types/types';

export const personaAddNew = (event) => ({
  type: typePersona.addNew,
  payload: event,
});

export const personaSetActive = (event) => ({
  type: typePersona.setActive,
  payload: event,
});
