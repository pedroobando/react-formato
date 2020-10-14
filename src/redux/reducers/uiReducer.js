import { typeModal } from '../types/types';

const initialState = {
  modalOpen: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeModal.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };

    case typeModal.uiCloseModal:
      return {
        ...state,
        modalOpen: false,
      };

    default:
      return state;
  }
};
