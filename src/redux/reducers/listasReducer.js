import { typeListas } from '../types/types';

const initialState = {
  lstDepartamentos: [],
  slcDepartamentos: [],
  vehiculos: [],
  aprobadoresAdm: [],
  aprobadoresSeg: [],
  personas: [],
  // active: null,
};

export const listasReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeListas.dptClear:
      return {
        ...state,
        lstDepartamentos: [],
        slcDepartamentos: [],
      };

    case typeListas.dptLoaded:
      return {
        ...state,
        lstDepartamentos: [...action.payload.lst],
        slcDepartamentos: [...action.payload.slc],
      };

    // case typeCollection.clearActive:
    //   return {
    //     ...state,
    //     active: null,
    //   };

    // case typeCollection.updated:
    //   return {
    //     ...state,
    //     collections: state.collections.map((e) =>
    //       e.id === action.payload.id ? action.payload : e
    //     ),
    //   };

    // case typeCollection.deleted:
    //   return {
    //     ...state,
    //     collections: state.collections.filter((e) => e.id !== state.active.id),
    //     active: null,
    //   };

    // case typeCollection.loaded:
    //   return {
    //     ...state,
    //     collections: [...action.payload.data],
    //     totalPages: action.payload.totalPages,
    //     activePage: action.payload.activePage,
    //   };

    // case typeCollection.logout:
    //   return {
    //     ...initialState,
    //   };

    default:
      return state;
  }
};
