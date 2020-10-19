import { typeSalida } from '../types/types';

export const salidaAddNew = (dataEntity) => ({
  type: typeSalida.addNew,
  payload: dataEntity,
});

export const salidaSetActive = (event) => ({
  type: typeSalida.setActive,
  payload: event,
});

export const salidaClearActive = () => ({
  type: typeSalida.clearActive,
});

export const salidaUpdated = (dataEntity) => ({
  type: typeSalida.updated,
  payload: dataEntity,
});

export const salidaDelete = () => ({
  type: typeSalida.deleted,
});
