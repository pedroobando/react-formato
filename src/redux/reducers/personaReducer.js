import { typePersona } from '../types/types';

const initialState = {
  personas: [],
  activePersona: null,
};

export const personaReducer = (state = initialState, action) => {
  switch (action.type) {
    case typePersona.setActive:
      return {
        ...state,
        activePersona: state.personas.find((element) => element.rowId === action.payload),
      };

    case typePersona.addNew:
      return {
        ...state,
        personas: [action.payload, ...state.personas],
      };

    case typePersona.clearActive:
      return {
        ...state,
        activePersona: null,
      };

    case typePersona.updated:
      return {
        ...state,
        personas: state.personas.map((e) =>
          e.rowId === action.payload.rowId ? action.payload : e
        ),
      };

    case typePersona.deleted:
      return {
        ...state,
        personas: state.personas.filter((e) => e.rowId !== state.activePersona.rowId),
        activePersona: null,
      };

    case typePersona.loaded:
      return {
        ...state,
        personas: [...action.payload],
      };

    case typePersona.logout:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
