import { typeCollection } from '../types/types';
import { fetchConToken } from '../../helpers/fetch';

export const departamentoStartLoading = (page = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(
        `departamento?page=${page}&limit=${limit}&sort=nombre`
      );
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

export const departamentoStartAddNew = (dataEntity) => {
  return async (dispatch, getState) => {
    try {
      const { uid, name } = getState().auth;
      const resp = await fetchConToken(
        'departamento',
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
        dispatch(departamentoAddNew(dataEntityUpd));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const departamentoStartUpdate = (dataEntity) => {
  return async (dispatch, getState) => {
    try {
      const { uid, name } = getState().auth;
      const resp = await fetchConToken(
        `departamento/${dataEntity.id}`,
        { ...dataEntity, creador: uid },
        'PUT'
      );
      const body = await resp.json();
      if (body.ok) {
        const dataEntityUpd = {
          ...dataEntity,
          user: { _id: uid, name },
        };
        dispatch(departamentoUpdated(dataEntityUpd));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const departamentoStartDelete = (dataEntity) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`departamento/${dataEntity.id}`, {}, 'DELETE');
      const body = await resp.json();
      if (body.ok) {
        dispatch(departamentoDelete());
        // const { activePage, totalPages } = getState().departamento;
        // dispatch(departamentoStartLoading(activePage, totalPages));
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

export const departamentoAddNew = (dataEntity) => ({
  type: typeCollection.addNew,
  payload: dataEntity,
});

export const departamentoSetActive = (event) => ({
  type: typeCollection.setActive,
  payload: event,
});

export const departamentoClearActive = () => ({
  type: typeCollection.clearActive,
});

export const departamentoUpdated = (dataEntity) => ({
  type: typeCollection.updated,
  payload: dataEntity,
});

export const departamentoDelete = () => ({
  type: typeCollection.deleted,
});

export const departamentoStartInit = () => ({
  type: typeCollection.init,
});
