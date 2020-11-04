import { typeCollection } from '../types/types';

const initialState = {
  collections: [],
  active: null,
};

// entity = {
//   id: '006',
//   nombre: 'Administracion',
//   abreviacion: 'ADM',
//   nrosalida: 0001,
// },

export const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeCollection.setActive:
      return {
        ...state,
        active: state.collections.find((element) => element.rowId === action.payload),
      };

    case typeCollection.addNew:
      return {
        ...state,
        collections: [action.payload, ...state.collections],
      };

    case typeCollection.clearActive:
      return {
        ...state,
        active: null,
      };

    case typeCollection.updated:
      return {
        ...state,
        collections: state.collections.map((e) =>
          e.rowId === action.payload.rowId ? action.payload : e
        ),
      };

    case typeCollection.deleted:
      return {
        ...state,
        collections: state.collections.filter((e) => e.rowId !== state.active.rowId),
        active: null,
      };

    case typeCollection.loaded:
      return {
        ...state,
        collections: [...action.payload.data],
        totalPages: action.payload.totalPages,
        activePage: action.payload.activePage,
      };

    case typeCollection.logout:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
