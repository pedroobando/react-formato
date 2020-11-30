import { typesAuth } from '../types/types';

const inititalState = {
  checking: true,
  uid: null,
  name: null,
  seccion: null,
  isAdmin: false,
};

export const authReducer = (state = inititalState, action) => {
  switch (action.type) {
    case typesAuth.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };

    case typesAuth.authCheckingFinish:
      return {
        ...state,
        checking: false,
        name: null,
        uid: null,
        seccion: null,
      };

    case typesAuth.authLogout:
      return {
        ...state,
        checking: false,
        name: null,
        uid: null,
        seccion: null,
      };

    default:
      return state;
  }
};
