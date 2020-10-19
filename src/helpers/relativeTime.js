import moment from 'moment';
import 'moment/locale/es';

export const relativeTime = (fecha = Date.now()) => {
  return moment(fecha).fromNow();
};
