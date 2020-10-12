import React, { useState } from 'react';
// import { VariableSizeList as List } from 'react-window';
// import AutoSizer from 'react-virtualized-auto-sizer';

import { SalidaItem } from './SalidaItem';
import { SalidaModal } from './SalidaModal';
import { AddNewTicket } from '../ui/AddNewTicket';

// import './styles.css';

const lstSalida = [
  {
    rowId: '5323',
    fecha: '20201012',
    material: 'Bomba x',
    motivo:
      'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus ',
    responsableNombre: 'Pedro Colmenares',
    transportePlaca: 'GNV-232F',
    user: {
      _id: 123,
      name: 'Carlos Eduardo',
    },
    active: false,
  },
  {
    rowId: '5322',
    fecha: '20200314',
    material: 'Bomba x',
    motivo:
      'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus ',
    responsableNombre: 'Pedro Colmenares',
    transportePlaca: 'GNV-232F',
    user: {
      _id: 123,
      name: 'Maglis',
    },
    active: false,
  },
  {
    rowId: '1001',
    fecha: '20200913',
    material: 'Bomba x',
    motivo:
      'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus ',
    responsableNombre: 'Pedro Colmenares',
    transportePlaca: 'GNV-232F',
    user: {
      _id: 123,
      name: 'Yotsi',
    },
  },
  {
    rowId: '1002',
    fecha: '20191230',
    material: 'Bomba x',
    motivo:
      'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus ',
    responsableNombre: 'Pedro Colmenares',
    transportePlaca: 'GNV-232F',
  },
  {
    rowId: '1003',
    fecha: '20200101',
    material: 'Bomba x',
    motivo:
      'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus ',
    responsableNombre: 'Pedro Colmenares',
    transportePlaca: 'GNV-232F',
  },
  {
    rowId: '1004',
    fecha: '20191130',
    material: 'Bomba x',
    motivo:
      'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus ',
    responsableNombre: 'Pedro Colmenares',
    transportePlaca: 'GNV-232F',
  },
  {
    rowId: '1005',
    fecha: '20201011',
    material: 'Bomba x',
    motivo:
      'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus ',
    responsableNombre: 'Pedro Colmenares',
    transportePlaca: 'GNV-232F',
  },
  {
    rowId: '1006',
    fecha: '20201001',
    material: 'Bomba x',
    motivo:
      'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus ',
    responsableNombre: 'Pedro Colmenares',
    transportePlaca: 'GNV-232F',
  },
];

export const SalidaScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectItem, setSelectItem] = useState();

  const handleOpenModal = () => {
    setModalOpen(true);
    // console.log(modalOpen);
  };

  const handleClickEvent = (event) => {
    setSelectItem(event.currentTarget.id);
  };

  const handleDobleClick = (event) => {
    console.log(event.currentTarget.id, 'pressdblclick');
  };

  const selectStyle = (rowId) => {
    let predStyle = 'list-group-item list-group-item-action';
    if (rowId === selectItem) {
      predStyle += ' active';
    }
    return predStyle;
  };

  return (
    <div>
      <div className="row">
        {lstSalida.map((itmSalida) => (
          <SalidaItem
            key={itmSalida.rowId}
            ordsalida={itmSalida}
            onClickEvent={handleClickEvent}
            onDblClickEvent={handleDobleClick}
            style={selectStyle(itmSalida.rowId)}
          />
        ))}
      </div>
      <AddNewTicket handleOpenModal={handleOpenModal} />
      <SalidaModal xstate={modalOpen} />
    </div>
  );
};
