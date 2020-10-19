import { typeSalida } from '../types/types';
import moment from 'moment';

// numerosec: '',
// fechaemision: new Date().getDate(),
// material: '',
// motivo: '',
// retornara: true,
// destino: '',
// solicitante: {
//   id: '',
//   toString: '',
// },
// transporte: {
//   id: '',
//   toString: '',
// },
// aprobadoradm: {
//   id: '',
//   toString: '',
// },
// aprobadorseg: {
//   id: '',
//   toString: '',
// },
// creador: {
//   id: '',
//   toString: '',
// },
// solicitanteTo: '',
// transporteTo: '',
// aprobadoradmTo: '',
// aprobadorsegTo: '',
// comentarioinicial: '',
// comentarios: [
//   {
//     fecha: new Date().getDate(),
//     nota: '',
//     usuario: {
//       id: '',
//       toString: '',
//     },
//   },
// ],
// };

export const salidaAddNew = (dataEntity) => {
  const data = {
    ...dataEntity,
    numerosec: 'ADM-0001-201',
    fechaemision: Date.now(),
  };

  return {
    type: typeSalida.addNew,
    payload: data,
  };
};

export const salidaSetActive = (event) => ({
  type: typeSalida.setActive,
  payload: event,
});

export const salidaClearActive = () => ({
  type: typeSalida.clearActive,
});

export const salidaUpdated = (dataEntity) => ({
  type: typeSalida.updated,
  payload: dataEntity,
});

export const salidaDelete = () => ({
  type: typeSalida.deleted,
});
