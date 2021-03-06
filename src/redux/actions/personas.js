import { typeCollection } from '../types/types';
import { fetchConToken } from '../../helpers/fetch';
import faker from 'faker';

export const personaStartLoading = (page = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`persona?page=${page}&limit=${limit}&sort=nombre`);
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
        // const { activePage, totalPages } = getState().persona;
        // dispatch(personaStartLoading(activePage, totalPages));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const personaOneLoad = async (personaId = '') => {
  try {
    const resp = await fetchConToken(`persona/${personaId}`);
    const body = await resp.json();
    return body;
    // console.log(body);
    // if (body.ok) {
    //   return body;
    // } else {body}
  } catch (error) {
    console.log(error);
    return { ok: false, data: undefined };
  }
  // return async () => {};
};

export const personaStartFaker = (quantity) => {
  const { name, phone, random, lorem } = faker;

  return (dispatch) => {
    try {
      let dataEntity = {};
      for (let index = 0; index < quantity; index++) {
        dataEntity = {
          activo: true,
          nombre: name.findName(),
          dni: random.alphaNumeric(10),
          comentario: lorem.paragraph(),
          aprobadoradm: true,
          aprobadorseg: true,
          telefono: phone.phoneNumber(),
        };
        dispatch(personaStartAddNew(dataEntity));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const personaAddNew = (dataEntity) => ({
  type: typeCollection.addNew,
  payload: dataEntity,
});

const personaUpdated = (dataEntity) => ({
  type: typeCollection.updated,
  payload: dataEntity,
});

const personaDelete = () => ({
  type: typeCollection.deleted,
});

const eventLoaded = (entities) => ({
  type: typeCollection.loaded,
  payload: {
    data: entities.data,
    totalPages: entities.totalPages,
    activePage: entities.page,
  },
});

export const personaSetActive = (event) => ({
  type: typeCollection.setActive,
  payload: event,
});

export const personaClearActive = () => ({
  type: typeCollection.clearActive,
});

export const personaStartInit = () => ({
  type: typeCollection.init,
});
