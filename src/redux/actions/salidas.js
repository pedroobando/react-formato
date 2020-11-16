import Swal from 'sweetalert2';
import { typeSalida } from '../types/types';
import { fetchConToken } from '../../helpers/fetch';

export const salidaStartLoading = async (page = 1, limit = 10, seccion) => {
  let retVal = { ok: false };
  try {
    const resp = await fetchConToken(
      `ordsalida?page=${page}&limit=${limit}&sort=fechaemision&sorttype=-1&seccion=${seccion}`
    );
    const body = await resp.json();
    // console.log(body);
    if (body.ok && body.data.length >= 1) {
      retVal = body;
    }
  } catch (error) {
    console.log(error);
  }
  return retVal;
};

export const salidaLoadNroOrden = (nroOrden, setFormValues) => {
  return async () => {
    try {
      const resp = await fetchConToken(`ordsalida/numerosec/${nroOrden}`);
      const body = await resp.json();
      if (body.ok) {
        setFormValues({ ...body.data });
        return true;
      } else {
        Swal.fire('favor verificar', body.data.message, 'warning');
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };
};

export const salidaStartAddNew = (dataEntity) => {
  return async (dispatch, getState) => {
    try {
      const { uid, seccion } = getState().auth;

      const dataEntityNew = {
        ...dataEntity,
        departamento: seccion,
        solicitante: dataEntity.solicitante.id,
        transporte: dataEntity.transporte.id,
        aprobadoradm: dataEntity.aprobadoradm.id,
        aprobadorseg: dataEntity.aprobadorseg.id,
        creador: uid,
      };

      const resp = await fetchConToken('ordsalida', dataEntityNew, 'POST');
      const body = await resp.json();
      if (!body.ok) {
        Swal.fire('Error creando', body.data.message, 'error');
      } else {
        dispatch(salidaAddNew(dataEntityNew));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const salidaStartUpdate = (dataEntity) => {
  return async (dispatch, getState) => {
    try {
      const { uid, name, seccion } = getState().auth;
      const dataEntityNew = {
        ...dataEntity,
        departamento: seccion,
        solicitante: dataEntity.solicitante.id,
        transporte: dataEntity.transporte.id,
        aprobadoradm: dataEntity.aprobadoradm.id,
        aprobadorseg: dataEntity.aprobadorseg.id,
        // creador: uid,
      };
      const resp = await fetchConToken(
        `ordsalida/${dataEntity.id}`,
        { ...dataEntityNew, creador: uid },
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
      const resp = await fetchConToken(`ordsalida/${dataEntity.id}`, {}, 'DELETE');
      const body = await resp.json();
      if (body.ok) {
        dispatch(salidaDelete());
      } else {
        Swal.fire('Error borrando', body.data.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

// const eventLoaded = (entities) => ({
//   type: typeSalida.loaded,
//   payload: {
//     data: entities.data,
//     totalPages: entities.totalPages,
//     activePage: entities.currentPage,
//   },
// });

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
