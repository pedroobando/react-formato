import Swal from 'sweetalert2';
import { typeCollection } from '../types/types';
import { fetchConToken } from '../../helpers/fetch';

export const vehiculoStartLoading = (page = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`vehiculo?page=${page}&limit=${limit}&sort=placa`);
      const body = await resp.json();
      // console.log(body);
      if (body.ok && body.data.length >= 1) {
        dispatch(eventLoaded(body));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const vehiculoStartAddNew = (dataEntity) => {
  return async (dispatch, getState) => {
    try {
      const { uid, name } = getState().auth;
      // console.log(dataEntity.placa);
      // const retVal = await vehiculoStartFPlaca(dataEntity.placa);
      // console.log(retVal);
      // const { marca, modelo, color, placa } = retVal.data;

      // if (retVal.ok) {
      //   Swal.fire({
      //     title: `Placa ${placa} registrada`,
      //     text: `Vehiculo ${marca} ${modelo} ${color}`,
      //     icon: 'error',
      //   });
      //   return;
      // }

      const resp = await fetchConToken(
        'vehiculo',
        { ...dataEntity, creador: uid },
        'POST'
      );
      const body = await resp.json();
      if (body.ok) {
        const dataEntityUpd = {
          ...dataEntity,
          id: body.data.id,
          user: { _id: uid, name },
        };
        dispatch(vehiculoAddNew(dataEntityUpd));
      } else {
        Swal.fire('Error Duplicidad', body.data.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const vehiculoStartFPlaca = (seekData) => {
  return async () => {
    try {
      // console.log(seekData);
      const resp = await fetchConToken(`vehiculo/placa/${seekData}`);
      const body = await resp.json();
      // console.log(body);
      return body;
      // if (body.ok ) {
      //   dispatch(eventLoaded(body));
      // }
    } catch (error) {
      console.error(error);
    }
  };
};

export const vehiculoStartUpdate = (dataEntity) => {
  return async (dispatch, getState) => {
    try {
      const { uid, name } = getState().auth;
      const resp = await fetchConToken(
        `vehiculo/${dataEntity.id}`,
        { ...dataEntity, creador: uid },
        'PUT'
      );
      const body = await resp.json();
      if (body.ok) {
        const dataEntityUpd = {
          ...dataEntity,
          user: { _id: uid, name },
        };
        dispatch(vehiculoUpdated(dataEntityUpd));
      } else {
        Swal.fire('Error', body.data.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const vehiculoStartDelete = (dataEntity) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`vehiculo/${dataEntity.id}`, {}, 'DELETE');
      const body = await resp.json();
      console.log(body);
      if (body.ok) {
        dispatch(vehiculoDelete());
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

export const vehiculoAddNew = (dataEntity) => ({
  type: typeCollection.addNew,
  payload: dataEntity,
});

export const vehiculoSetActive = (event) => ({
  type: typeCollection.setActive,
  payload: event,
});

export const vehiculoClearActive = () => ({
  type: typeCollection.clearActive,
});

export const vehiculoUpdated = (dataEntity) => ({
  type: typeCollection.updated,
  payload: dataEntity,
});

export const vehiculoDelete = () => ({
  type: typeCollection.deleted,
});

export const vehiculoStartInit = () => ({
  type: typeCollection.init,
});
