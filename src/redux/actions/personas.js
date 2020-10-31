import { typePersona } from '../types/types';
import { fetchConToken } from '../../helpers/fetch';

export const personaStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken('persona');
      const body = await resp.json();

      if (body.ok && body.data.length >= 1) {
        dispatch(eventLoaded(body.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const personaStartAddNew = (dataEntity) => {
  return async (dispatch, getState) => {
    try {
      const { uid, name } = getState().auth;
      const resp = await fetchConToken(
        'persona',
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
        dispatch(personaAddNew(dataEntityUpd));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const personaStartUpdate = (dataEntity) => {
  return async (dispatch, getState) => {
    try {
      const { uid, name } = getState().auth;
      const resp = await fetchConToken(
        `persona/${dataEntity.id}`,
        { ...dataEntity, creador: uid },
        'PUT'
      );
      const body = await resp.json();
      if (body.ok) {
        const dataEntityUpd = {
          ...dataEntity,
          user: { _id: uid, name },
        };
        dispatch(personaUpdated(dataEntityUpd));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const personaStartDelete = (dataEntity) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`persona/${dataEntity.id}`, {}, 'DELETE');
      const body = await resp.json();
      if (body.ok) {
        dispatch(personaDelete());
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const personaAddNew = (dataEntity) => ({
  type: typePersona.addNew,
  payload: dataEntity,
});

const personaUpdated = (dataEntity) => ({
  type: typePersona.updated,
  payload: dataEntity,
});

const personaDelete = () => ({
  type: typePersona.deleted,
});

const eventLoaded = (entities) => ({
  type: typePersona.loaded,
  payload: entities,
});

export const personaSetActive = (event) => ({
  type: typePersona.setActive,
  payload: event,
});

export const personaClearActive = () => ({
  type: typePersona.clearActive,
});
