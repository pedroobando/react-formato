import { typeDepartamento } from '../types/types';

export const departamentoAddNew = (dataEntity) => ({
  type: typeDepartamento.addNew,
  payload: dataEntity,
});

export const departamentoSetActive = (event) => ({
  type: typeDepartamento.setActive,
  payload: event,
});

export const departamentoClearActive = () => ({
  type: typeDepartamento.clearActive,
});

export const departamentoUpdated = (dataEntity) => ({
  type: typeDepartamento.updated,
  payload: dataEntity,
});

export const departamentoDelete = () => ({
  type: typeDepartamento.deleted,
});
