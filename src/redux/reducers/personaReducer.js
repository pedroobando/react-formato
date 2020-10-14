import { typePersona } from '../types/types';

const initialState = {
  personas: [
    {
      rowId: '001',
      nombre: 'pedro obando',
      dni: '38728787',
      telefono: '3232323',
      comentario:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure fugiat dolores dolorem? Quidem eius a recusandae rerum voluptatibus ipsa, similique, veritatis itaque architecto quos maiores est adipisci repudiandae! Rerum, commodi?',
      user: {
        _id: '123',
        name: 'pedro',
      },
    },
    {
      rowId: '002',
      nombre: 'Maria Carmona',
      dni: '323244545',
      telefono: '3232222323',
      comentario:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure fugiat dolores dolorem? Quidem eius a recusandae rerum voluptatibus ipsa, similique, veritatis itaque architecto quos maiores est adipisci repudiandae! Rerum, commodi?',
      user: {
        _id: '123',
        name: 'pedro',
      },
    },
    {
      rowId: '003',
      nombre: 'Felipe Guerra',
      dni: 'v10248564',
      telefono: '3232323 - 594858985 -4344434',
      comentario:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure fugiat dolores dolorem? Quidem eius a recusandae rerum voluptatibus ipsa, similique, veritatis itaque architecto quos maiores est adipisci repudiandae! Rerum, commodi?',
      user: {
        _id: '123',
        name: 'pedro',
      },
    },
  ],
  activePersona: null,
};

export const personaReducer = (state = initialState, action) => {
  switch (action.type) {
    case typePersona.setActive:
      return {
        ...state,
        activePersona: state.personas.find((element) => element.rowId === action.payload),
      };

    default:
      return state;
  }
};
