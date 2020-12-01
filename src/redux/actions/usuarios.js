import Swal from 'sweetalert2';
import { typeCollection } from '../types/types';
import { fetchConToken } from '../../helpers/fetch';

export const usuarioStartLoading = (page = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`usuario?page=${page}&limit=${limit}&sort=name`);
      const body = await resp.json();
      if (body.ok && body.data.length >= 1) {
        dispatch(eventLoaded(body));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const usuarioStartLoad = async (userId) => {
  try {
    const resp = await fetchConToken(`usuario/${userId}`);
    const body = await resp.json();
    if (body.ok) {
      return body.data;
      // dispatch(eventLoaded(body));
    } else {
      Swal.fire('Problemas', body.data.message, 'warning');
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

export const usuarioStartAddNew = (dataEntity) => {
  return async (dispatch, getState) => {
    try {
      const { uid, name } = getState().auth;
      const resp = await fetchConToken(
        'auth/new',
        { ...dataEntity, departamento: dataEntity.departamento.id, creador: uid },
        'POST'
      );
      const body = await resp.json();
      if (body.ok) {
        const dataEntityUpd = {
          ...dataEntity,
          id: body.data.uid,
          user: { _id: uid, name },
        };
        dispatch(usuarioAddNew(dataEntityUpd));
      } else {
        Swal.fire('Error Duplicidad', body.data.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const usuarioStartUpdate = (dataEntity) => {
  return async (dispatch, getState) => {
    try {
      // const { id } = dataEntity.departamento;
      // dataEntity.departamento = id;

      // console.log(dataEntity);
      const { uid, name } = getState().auth;
      // console.log(dataEntity);
      const resp = await fetchConToken(
        `usuario/${dataEntity.id}`,
        { ...dataEntity, departamento: dataEntity.departamento.id, creador: uid },
        'PUT'
      );
      const body = await resp.json();
      if (body.ok) {
        const dataEntityUpd = {
          ...dataEntity,
          user: { _id: uid, name },
        };
        dispatch(usuarioUpdated(dataEntityUpd));
      } else {
        Swal.fire('Error', body.data.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const usuarioStartDelete = (dataEntity) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`usuario/${dataEntity.uid}`, {}, 'DELETE');
      const body = await resp.json();
      // console.log(body);
      if (body.ok) {
        dispatch(usuarioDelete());
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const usuarioChangePass = (newPass) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      const resp = await fetchConToken(
        `usuario/password/${uid}`,
        { password: newPass },
        'PUT'
      );
      const body = await resp.json();
      if (body.ok) {
        dispatch(usuarioClearActive());
      } else {
        Swal.fire('Error', body.data.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const eventLoaded = (entities) => ({
  type: typeCollection.loaded,
  payload: {
    data: entities.data,
    totalPages: entities.totalPages,
    activePage: entities.page,
  },
});

export const usuarioAddNew = (dataEntity) => ({
  type: typeCollection.addNew,
  payload: dataEntity,
});

export const usuarioSetActive = (event) => ({
  type: typeCollection.setActive,
  payload: event,
});

export const usuarioClearActive = () => ({
  type: typeCollection.clearActive,
});

export const usuarioUpdated = (dataEntity) => ({
  type: typeCollection.updated,
  payload: dataEntity,
});

export const usuarioDelete = () => ({
  type: typeCollection.deleted,
});
