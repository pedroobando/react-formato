import { typeVehiculo } from '../types/types';

export const vehiculoAddNew = (dataEntity) => ({
  type: typeVehiculo.addNew,
  payload: dataEntity,
});

export const vehiculoSetActive = (event) => ({
  type: typeVehiculo.setActive,
  payload: event,
});

export const vehiculoClearActive = () => ({
  type: typeVehiculo.clearActive,
});

export const vehiculoUpdated = (dataEntity) => ({
  type: typeVehiculo.updated,
  payload: dataEntity,
});

export const vehiculoDelete = () => ({
  type: typeVehiculo.deleted,
});
