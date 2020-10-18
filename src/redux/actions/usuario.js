import { typeUsuario } from '../types/types';

export const usuarioAddNew = (dataEntity) => ({
  type: typeUsuario.addNew,
  payload: dataEntity,
});

export const usuarioSetActive = (event) => ({
  type: typeUsuario.setActive,
  payload: event,
});

export const usuarioClearActive = () => ({
  type: typeUsuario.clearActive,
});

export const usuarioUpdated = (dataEntity) => ({
  type: typeUsuario.updated,
  payload: dataEntity,
});

export const usuarioDelete = () => ({
  type: typeUsuario.deleted,
});
