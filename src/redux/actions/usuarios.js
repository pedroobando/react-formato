import Swal from 'sweetalert2';
import { typeCollection } from '../types/types';
import { fetchConToken } from '../../helpers/fetch';

export const usuarioStartLoading = (page = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`usuario?page=${page}&limit=${limit}&sort=name`);
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

export const departamentoStartLoading = (page = 1, limit = 100) => {
  return async () => {
    try {
      const resp = await fetchConToken(
        `departamento?page=${page}&limit=${limit}&sort=nombre`
      );
      const body = await resp.json();
      // console.log(body);
      if (body.ok && body.data.length >= 1) {
        return body.data.map((item) => ({ id: item.id, nombre: item.nombre }));
        // dispatch(eventLoaded(body));
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const usuarioStartAddNew = (dataEntity) => {
  return async (dispatch, getState) => {
    try {
      // console.log(dataEntity);
      const { uid, name } = getState().auth;
      const resp = await fetchConToken(
        'auth/new',
        { ...dataEntity, creador: uid },
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
        dispatch(usuarioAddNew(dataEntityUpd));
      } else {
        Swal.fire('Error Duplicidad', body.data.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

// export const usuarioStartFPlaca = (seekData) => {
//   return async () => {
//     try {
//       // console.log(seekData);
//       const resp = await fetchConToken(`usuario/placa/${seekData}`);
//       const body = await resp.json();
//       // console.log(body);
//       return body;
//       // if (body.ok ) {
//       //   dispatch(eventLoaded(body));
//       // }
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

export const usuarioStartUpdate = (dataEntity) => {
  // console.log(dataEntity);

  return async (dispatch, getState) => {
    try {
      const { id } = dataEntity.departamento;
      dataEntity.departamento = id;
      const { uid, name } = getState().auth;
      const resp = await fetchConToken(
        `usuario/${dataEntity.id}`,
        { ...dataEntity, creador: uid },
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
      const resp = await fetchConToken(`usuario/${dataEntity.id}`, {}, 'DELETE');
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

const eventLoaded = (entities) => ({
  type: typeCollection.loaded,
  payload: {
    // data: entities.data.map((item) => ({
    //   ...item,
    //   departamento: !!item.departamento ? item.departamento.id : '',
    //   departamentoName: !!item.departamento ? item.departamento.nombre : '',
    // })),

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
