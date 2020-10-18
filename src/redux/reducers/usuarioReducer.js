import { typeUsuario } from '../types/types';

const initialState = {
  usuarios: [],
  active: null,
};

// vehiculo = {
//   rowId: '006',
//   placa: 'PEW-23D',
//   marca: 'NISAN',
//   modelo: 'J3',
//   color: 'GRIS',
// },

export const vehiculoReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeUsuario.setActive:
      return {
        ...state,
        active: state.usuarios.find((element) => element.rowId === action.payload),
      };

    case typeUsuario.addNew:
      return {
        ...state,
        vehiculos: [action.payload, ...state.usuarios],
      };

    case typeUsuario.clearActive:
      return {
        ...state,
        active: null,
      };

    case typeUsuario.updated:
      return {
        ...state,
        vehiculos: state.usuarios.map((e) =>
          e.rowId === action.payload.rowId ? action.payload : e
        ),
      };

    case typeUsuario.deleted:
      return {
        ...state,
        vehiculos: state.usuarios.filter((e) => e.rowId !== state.active.rowId),
        active: null,
      };

    case typeUsuario.loaded:
      return {
        ...state,
        vehiculos: [...action.payload],
      };

    case typeUsuario.logout:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
