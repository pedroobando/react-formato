import { typeSalida } from '../types/types';

export const salidaAddNew = (dataEntity) => {
  const data = {
    ...dataEntity,
    numerosec: 'ADM-0001-201',
    fechaemision: Date.now(),
  };

  return {
    type: typeSalida.addNew,
    payload: data,
  };
};

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
