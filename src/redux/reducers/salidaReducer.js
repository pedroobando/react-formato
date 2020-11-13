import { typeSalida } from '../types/types';

const initialState = {
  salidas: [],

  active: null,
};

// const entity = {
//   rowId: '006',
//   numerosec: 'ADM-00000-2020',
//   fechaemision: '2020-02-01',
//   material: 'algun material o oequipo',
//   motivo: 'reparacion de x cosa',
//   retornara: true,
//   destino: 'direccion donde estara',
//   solicitante: {
//     id: '387487343',
//     toString: 'pedro perez',
//   },
//   transporte: {
//     id: '387487343',
//     toString: 'GDA-6458',
//   },
//   aprobadoradm: {
//     id: '387487343',
//     toString: 'pedro perez',
//   },
//   aprobadorseg: {
//     id: '387487343',
//     toString: 'pedro perez',
//   },
//   creador: {
//     id: '387487343',
//     toString: 'pedro perez',
//   },
//   comentarios: [
//     {
//       fecha: '2020-01-20',
//       nota: 'Se entrego la pieza a x elemento',
//       usuario: {
//         id: '387487343',
//         toString: 'pedro perez',
//       },
//     },
//   ],
// };

export const salidaReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeSalida.setActive:
      return {
        ...state,
        active: state.salidas.find((element) => element.id === action.payload),
      };

    case typeSalida.addNew:
      return {
        ...state,
        salidas: [action.payload, ...state.salidas],
      };

    case typeSalida.clearActive:
      return {
        ...state,
        active: null,
      };

    case typeSalida.updated:
      return {
        ...state,
        salidas: state.salidas.map((e) =>
          e.rowId === action.payload.id ? action.payload : e
        ),
      };

    case typeSalida.deleted:
      return {
        ...state,
        salidas: state.salidas.filter((e) => e.id !== state.active.id),
        active: null,
      };

    case typeSalida.loaded:
      return {
        ...state,
        salidas: [...action.payload.data],
        totalPages: action.payload.totalPages,
        activePage: action.payload.activePage,
      };

    case typeSalida.logout:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
