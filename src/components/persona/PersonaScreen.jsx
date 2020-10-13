import React, { useState } from 'react';
import { PersonaItem } from './PersonaItem';
import { AddNewTicket } from '../ui/AddNewTicket';
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
    // console.log(modalOpen);
  };

  const handleClickEvent = (event) => {
    // setSelectItem(event.currentTarget.id);
  };

  const handleDobleClick = (event) => {
    console.log(event.currentTarget.id, 'pressdblclick');
  };

  // const selectStyle = (rowId) => {
  //   let predStyle = 'list-group-item list-group-item-action';
  //   if (rowId === selectItem) {
  //     predStyle += ' active';
  //   }
  //   return predStyle;
  // };

  return (
    <div>
      <div className="row mt-1">
        {lstPersonas.map((item) => (
          <PersonaItem
            key={item.rowId}
            persona={item}
            onClickEvent={handleClickEvent}
            onDblClickEvent={handleDobleClick}
            style="list-group-item list-group-item-action"
          />
        ))}
      </div>
      <AddNewTicket handleOpenModal={handleOpenModal} />
      <PersonaModal xstate={modalOpen} />
    </div>
  );
};
