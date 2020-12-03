import { fetchConToken, fetchSinToken } from '../../helpers/fetch';
import { typesAuth } from '../types/types';

import Swal from 'sweetalert2';

export const startLogin = (username, password) => {
  return async (dispath) => {
    const resp = await fetchSinToken('auth', { name: username, password }, 'POST');
    const body = await resp.json();

    // console.log(body);

    if (body.ok) {
      localStorage.setItem('token', body.data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      localStorage.setItem('seccion', body.data.seccion);
      localStorage.setItem('admin', body.data.isAdmin);
      // const { uid, name } = body.data;
      dispath(
        login({
          uid: body.data.uid,
          name: body.data.name,
          seccion: body.data.seccion,
          isAdmin: body.data.isAdmin,
        })
      );
    } else {
      Swal.fire({
        title: 'Verificar',
        text: body.data.message,
        icon: 'error',
      });
      // return;
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispath) => {
    const resp = await fetchSinToken(
      'auth/new',
      { name, fullname: name, email, password, administrador: true },
      'POST'
    );
    const body = await resp.json();

    // console.log(body);

    if (body.ok) {
      localStorage.setItem('token', body.data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      // const { uid, name } = body.data;
      dispath(
        login({
          uid: body.data.uid,
          name: body.data.name,
          isAdmin: true,
        })
      );
    } else {
      Swal.fire({
        title: 'Verificar',
        text: body.data.message,
        icon: 'error',
      });
    }
  };
};

export const startLogout = () => {
  return async (dispath) => {
    localStorage.clear();
    dispath(logout());
  };
};

export const startCheckin = () => {
  return async (dispath) => {
    const resp = await fetchConToken('auth/renew');
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem('token', body.data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      const lseccion = localStorage.getItem('seccion');
      const lisAdmin = localStorage.getItem('admin') === 'true';

      dispath(
        login({
          uid: body.data.uid,
          name: body.data.name,
          seccion: lseccion,
          isAdmin: lisAdmin,
        })
      );
    } else {
      // Swal.fire({
      //   title: 'Verificar',
      //   text: body.data.message,
      //   icon: 'error',
      // });
      dispath(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: typesAuth.authCheckingFinish });

const login = (user) => ({
  type: typesAuth.authLogin,
  payload: user,
});

const logout = () => ({
  type: typesAuth.authLogout,
});
