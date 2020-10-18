import { typeUsuario } from '../types/types';

const initialState = {
  usuarios: [],
  active: null,
};

// usuario = {
//   rowId: '006',
//   name: 'PEW-23D',
//   fullname: 'NISAN',
//   email: 'J3',
//   password: 'GRIS',
//  active:true
// },

export const usuarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeUsuario.setActive:
      return {
        ...state,
        active: state.usuarios.find((element) => element.rowId === action.payload),
      };

    case typeUsuario.addNew:
      return {
        ...state,
        usuarios: [action.payload, ...state.usuarios],
      };

    case typeUsuario.clearActive:
      return {
        ...state,
        active: null,
      };

    case typeUsuario.updated:
      return {
        ...state,
        usuarios: state.usuarios.map((e) =>
          e.rowId === action.payload.rowId ? action.payload : e
        ),
      };

    case typeUsuario.deleted:
      return {
        ...state,
        usuarios: state.usuarios.filter((e) => e.rowId !== state.active.rowId),
        active: null,
      };

    case typeUsuario.loaded:
      return {
        ...state,
        usuarios: [...action.payload],
      };

    case typeUsuario.logout:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
