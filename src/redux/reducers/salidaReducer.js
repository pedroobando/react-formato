import { typeSalida } from '../types/types';

const initialState = {
  ordsalidas: [],
  active: null,
};

// entity = {
//   rowId: '006',
//   numerosec: 'ADM-00000-2020',
//   fechaemision: '2020-02-01',
//   material: 'algun material o oequipo',
//   motivo: 'reparacion de x cosa',
//   retornara: true,
//   destino: 'direccion donde estara',
//   solicitante: {
//      id:'387487343',
//      toString:'pedro perez'
//    },
//   transporte: {
//      id:'387487343',
//      toString:'GDA-6458'
//    },
//   aprobadoradm: {
//      id:'387487343',
//      toString:'pedro perez'
//    },
//   aprobadorseg: {
//      id:'387487343',
//      toString:'pedro perez'
//    },
//   creador: {
//      id:'387487343',
//      toString:'pedro perez'
//    },
//   comentarios: [{
//      fecha:'2020-01-20',
//      nota:'Se entrego la pieza a x elemento'
//      usuario: {
//        id:'387487343',
//        toString:'pedro perez'
//      },
//   }],
//   comentarios: [{
//      fecha:'2020-01-20',
//      nota:'Se entrego la pieza a x elemento'
//      usuario: {
//        id:'387487343',
//        toString:'pedro perez'
//      },
//   }],
//   comentarios: [{
//      fecha:'2020-01-20',
//      nota:'Se entrego la pieza a x elemento'
//      usuario: {
//        id:'387487343',
//        toString:'pedro perez'
//      },
//    },
//    {
//      fecha:'2020-01-20',
//      nota:'Se entrego la pieza a x elemento'
//      usuario: {
//        id:'387487343',
//        toString:'pedro perez'
//      },
//    }
// },

export const salidaReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeSalida.setActive:
      return {
        ...state,
        active: state.ordsalidas.find((element) => element.rowId === action.payload),
      };

    case typeSalida.addNew:
      return {
        ...state,
        ordsalidas: [action.payload, ...state.ordsalidas],
      };

    case typeSalida.clearActive:
      return {
        ...state,
        active: null,
      };

    case typeSalida.updated:
      return {
        ...state,
        ordsalidas: state.ordsalidas.map((e) =>
          e.rowId === action.payload.rowId ? action.payload : e
        ),
      };

    case typeSalida.deleted:
      return {
        ...state,
        ordsalidas: state.ordsalidas.filter((e) => e.rowId !== state.active.rowId),
        active: null,
      };

    case typeSalida.loaded:
      return {
        ...state,
        ordsalidas: [...action.payload],
      };

    case typeSalida.logout:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
