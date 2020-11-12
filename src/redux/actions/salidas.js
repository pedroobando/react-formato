import Swal from 'sweetalert2';
import { typeSalida } from '../types/types';
import { fetchConToken } from '../../helpers/fetch';

export const salidaStartLoading = (page = 1, limit = 20) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(
        `salida?page=${page}&limit=${limit}&sort=fechaemision`
      );
      const body = await resp.json();
      // console.log(body);
      if (body.ok && body.data.length >= 1) {
        // console.log(body.data);
        dispatch(eventLoaded(body));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const salidaStartAddNew = (dataEntity) => {
  return async (dispatch, getState) => {
    try {
      const { uid, name } = getState().auth;
      const resp = await fetchConToken(
        'salida',
        { ...dataEntity, departamento: dataEntity.departamento.id, creador: uid },
        'POST'
      );
      const body = await resp.json();
      // console.log(body);
      if (body.ok) {
        const dataEntityUpd = {
          ...dataEntity,
          id: body.data.uid,
          user: { _id: uid, name },
        };
        dispatch(salidaAddNew(dataEntityUpd));
      } else {
        Swal.fire('Error creando', body.data.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const salidaStartUpdate = (dataEntity) => {
  return async (dispatch, getState) => {
    try {
      // const { id } = dataEntity.departamento;
      // dataEntity.departamento = id;
      const { uid, name } = getState().auth;
      const resp = await fetchConToken(
        `salida/${dataEntity.id}`,
        { ...dataEntity, creador: uid },
        'PUT'
      );
      const body = await resp.json();
      if (body.ok) {
        const dataEntityUpd = {
          ...dataEntity,
          user: { _id: uid, name },
        };
        dispatch(salidaUpdated(dataEntityUpd));
      } else {
        Swal.fire('Error actualizado', body.data.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const salidaStartDelete = (dataEntity) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`salida/${dataEntity.uid}`, {}, 'DELETE');
      const body = await resp.json();
      if (body.ok) {
        dispatch(salidaDelete());
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const eventLoaded = (entities) => ({
  type: typeSalida.loaded,
  payload: {
    data: entities.data,
    totalPages: entities.totalPages,
    activePage: entities.page,
  },
});

export const salidaAddNew = (dataEntity) => ({
  type: typeSalida.addNew,
  payload: dataEntity,
});

// {
//   const data = {
//     ...dataEntity,
//     numerosec: 'ADM-0001-201',
//     fechaemision: Date.now(),
//   };

//   return {
//     type: typeSalida.addNew,
//     payload: data,
//   };
// };

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
