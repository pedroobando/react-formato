import { typeDepartamento } from '../types/types';

export const vehiculoAddNew = (dataEntity) => ({
  type: typeDepartamento.addNew,
  payload: dataEntity,
});

export const vehiculoSetActive = (event) => ({
  type: typeDepartamento.setActive,
  payload: event,
});

export const vehiculoClearActive = () => ({
  type: typeDepartamento.clearActive,
});

export const vehiculoUpdated = (dataEntity) => ({
  type: typeDepartamento.updated,
  payload: dataEntity,
});

export const vehiculoDelete = () => ({
  type: typeDepartamento.deleted,
});
