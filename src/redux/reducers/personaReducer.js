/* eslint-disable no-irregular-whitespace */
import { typePersona } from '../types/types';
// const item ={
//   ​​rowId: "5f9c7d147b415120550c0f53",
//   activo: true,
//   ​​aprobadoradm: true,
//   ​​aprobadorseg: true,
//   ​​comentario: "324 32432432432324",
//   ​​creador: "5f9c35b8ecfeb73d914ffde3",
//   ​​createdAt: "2020-10-30T20:52:36.482Z",
//   ​​dni: "3434SDDSFDS",
//   ​​nombre: "343434 34343434",
//   ​​telefono: "324324324",
//   user:{
//     _id: '2323232323',
//     name: 'pedro'
//   },
// ​}

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
