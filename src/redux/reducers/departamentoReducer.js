import { typeDepartamento } from '../types/types';

const initialState = {
  departamentos: [],
  active: null,
};

// entity = {
//   rowId: '006',
//   nombre: 'Administracion',
//   abreviacion: 'ADM',
//   nrosalida: 0001,
// },

export const departamentoReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeDepartamento.setActive:
      return {
        ...state,
        active: state.departamentos.find((element) => element.rowId === action.payload),
      };

    case typeDepartamento.addNew:
      return {
        ...state,
        departamentos: [action.payload, ...state.departamentos],
      };

    case typeDepartamento.clearActive:
      return {
        ...state,
        active: null,
      };

    case typeDepartamento.updated:
      return {
        ...state,
        departamentos: state.departamentos.map((e) =>
          e.rowId === action.payload.rowId ? action.payload : e
        ),
      };

    case typeDepartamento.deleted:
      return {
        ...state,
        departamentos: state.departamentos.filter((e) => e.rowId !== state.active.rowId),
        active: null,
      };

    case typeDepartamento.loaded:
      return {
        ...state,
        departamentos: [...action.payload],
      };

    case typeDepartamento.logout:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
