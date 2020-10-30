import { typesAuth } from '../types/types';

const inititalState = {
  checking: true,
  uid: null,
  name: null,
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
      };

    default:
      return state;
  }
};
