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
        checking: false,
        ...action.payload,
      };

    default:
      return state;
  }
};
