import { fetchSinToken } from '../../helpers/fetch';
import { typesAuth } from '../types/types';

import Swal from 'sweetalert2';

export const startLogin = (email, password) => {
  return async (dispath) => {
    const resp = await fetchSinToken('auth', { email, password }, 'POST');
    const body = await resp.json();

    console.log(body);

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      // const { uid, name } = body.data;
      dispath(login({ uid: body.data.uid, name: body.data.name }));
    } else {
      Swal.fire({
        title: 'Verificar',
        text: body.data.message,
        icon: 'error',
      });
      return;
    }
  };
};

const login = (user) => ({
  type: typesAuth.authLogin,
  payload: user,
});
