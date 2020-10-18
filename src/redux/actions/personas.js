import { typePersona } from '../types/types';

export const personaAddNew = (dataEntity) => ({
  type: typePersona.addNew,
  payload: dataEntity,
});

export const personaSetActive = (event) => ({
  type: typePersona.setActive,
  payload: event,
});

export const personaClearActive = () => ({
  type: typePersona.clearActive,
});

export const personaUpdated = (dataEntity) => ({
  type: typePersona.updated,
  payload: dataEntity,
});

export const personaDelete = () => ({
  type: typePersona.deleted,
});
