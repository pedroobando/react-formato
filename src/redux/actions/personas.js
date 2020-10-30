import { typePersona } from '../types/types';
import { fetchConToken } from '../../helpers/fetch';

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
          rowId: body.data.id,
          user: { _id: uid, name },
        };
        // dataEntity.rowId = body.data.id;
        // dataEntity.user = { _id: uid, name };
        dispatch(personaAddNew(dataEntityUpd));
      }
      console.log(body);
    } catch (error) {
      console.error(error);
    }
  };
};

export const personaAddNew = (dataEntity) => ({
  type: typePersona.addNew,
  payload: dataEntity,
});

export const personaSetActive = (event) => ({
  type: typePersona.setActive,
  payload: event,
});

export const personaClearActive = () => ({
  type: typePersona.clearActive,
});

export const personaUpdated = (dataEntity) => ({
  type: typePersona.updated,
  payload: dataEntity,
});

export const personaDelete = () => ({
  type: typePersona.deleted,
});

export const personaStartLoading = () => {
  return async (dispatch) => {
    // const { uid, name } = getState().auth;
    try {
      const resp = await fetchConToken('persona');
      const body = await resp.json();
      // const { events, ok } = body;

      if (body.ok && body.data.length >= 1) {
        // const events = prepareEvents(body.events);
        // console.log(events);
        dispatch(eventLoaded(body.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = (entities) => ({
  type: typePersona.loaded,
  payload: entities,
});
