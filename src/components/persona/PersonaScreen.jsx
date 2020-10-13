import React, { useState } from 'react';
import { PersonaItem } from './PersonaItem';
import { AddNewItem } from '../ui/AddNewItem';
import { PersonaModal } from './PersonaModal';

const lstPersonas = [
  {
    rowId: '001',
    nombre: 'pedro obando',
    dni: '38728787',
    telefono: '3232323',
    comentario:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure fugiat dolores dolorem? Quidem eius a recusandae rerum voluptatibus ipsa, similique, veritatis itaque architecto quos maiores est adipisci repudiandae! Rerum, commodi?',
  },
  {
    rowId: '002',
    nombre: 'Maria Carmona',
    dni: '323244545',
    telefono: '3232222323',
    comentario:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure fugiat dolores dolorem? Quidem eius a recusandae rerum voluptatibus ipsa, similique, veritatis itaque architecto quos maiores est adipisci repudiandae! Rerum, commodi?',
  },
  {
    rowId: '003',
    nombre: 'Felipe Guerra',
    dni: 'v10248564',
    telefono: '3232323 - 594858985 -4344434',
    comentario:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure fugiat dolores dolorem? Quidem eius a recusandae rerum voluptatibus ipsa, similique, veritatis itaque architecto quos maiores est adipisci repudiandae! Rerum, commodi?',
  },
];

export const PersonaScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleClickEvent = (event) => {
    // setSelectItem(event.currentTarget.id);
  };

  const handleDobleClick = (event) => {
    console.log(event.currentTarget.id, 'pressdblclick');
  };

  return (
    <div>
      <div className="row mt-1">
        {lstPersonas.map((item) => (
          <PersonaItem
            key={item.rowId}
            persona={item}
            onClickEvent={handleClickEvent}
            onDblClickEvent={handleDobleClick}
          />
        ))}
      </div>
      <AddNewItem handleOpenModal={handleOpenModal} />
      <PersonaModal xstate={modalOpen} />
    </div>
  );
};
