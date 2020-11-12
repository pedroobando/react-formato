import { typeListas } from '../types/types';
import { fetchConToken } from '../../helpers/fetch';

export const listaDptoStartLoading = (page = 1, limit = 100) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(
        `departamento?page=${page}&limit=${limit}&sort=nombre`
      );
      const body = await resp.json();
      // console.log(body);
      if (body.ok && body.data.length >= 1) {
        // return body.data.map((item) => ({ id: item.id, nombre: item.nombre }));
        dispatch(eventLoadedDpto(body));
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const departamentoClear = () => {
  return async (dispatch) => {
    try {
      dispatch(eventClearDpto());
    } catch (error) {
      console.log(error);
    }
  };
};

// export const usuarioStartAddNew = (dataEntity) => {
//   return async (dispatch, getState) => {
//     try {
//       const { uid, name } = getState().auth;
//       const resp = await fetchConToken(
//         'auth/new',
//         { ...dataEntity, departamento: dataEntity.departamento.id, creador: uid },
//         'POST'
//       );
//       const body = await resp.json();
//       // console.log(body);
//       if (body.ok) {
//         const dataEntityUpd = {
//           ...dataEntity,
//           id: body.data.uid,
//           user: { _id: uid, name },
//         };
//         dispatch(usuarioAddNew(dataEntityUpd));
//       } else {
//         Swal.fire('Error Duplicidad', body.data.message, 'error');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

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

const eventLoadedDpto = (entities) => ({
  type: typeListas.dptLoaded,
  payload: {
    lst: entities.data.map((item) => ({
      id: item.id,
      name: item.nombre,
    })),
    slc: entities.data.map((item) => ({
      value: item.id,
      label: item.nombre,
    })),
  },
});

const eventClearDpto = () => ({
  type: typeListas.dptClear,
});
