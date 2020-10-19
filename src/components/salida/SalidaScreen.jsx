import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SalidaItem } from './SalidaItem';
import { DeleteItem } from '../ui/DeleteItem';

import { uiOpenModal } from '../../redux/actions/ui';
import { salidaSetActive } from '../../redux/actions/salidas';
import { AddNewItem } from '../ui/AddNewItem';

export const SalidaScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { salidas: lstOrdSalidas } = useSelector((state) => state.ordsalida);

  const handleOpenModal = () => {
    history.push('/salida/nuevo');
  };

  const handleClickEvent = (event) => {
    dispatch(salidaSetActive(event.currentTarget.id));
    history.push('/salida/nuevo');
    // dispatch(uiOpenModal());
  };

  // const handleClickEvent = (event) => {
  //   setSelectItem(event.currentTarget.id);
  // };

  // const handleDobleClick = (event) => {
  //   console.log(event.currentTarget.id, 'pressdblclick');
  // };

  // const selectStyle = (rowId) => {
  //   let predStyle = 'list-group-item list-group-item-action';
  //   if (rowId === selectItem) {
  //     predStyle += ' active';
  //   }
  //   return predStyle;
  // };

  return (
    <div>
      <div className="row my-1">
        {lstOrdSalidas.map((iten) => (
          <SalidaItem
            key={iten.rowId}
            ordsalida={iten}
            onClickEvent={handleClickEvent}
            // onDblClickEvent={handleDobleClick}
            // style={selectStyle(itmSalida.rowId)}
          />
        ))}
      </div>
      {/* <DeleteItem /> */}
      <AddNewItem handleOpenModal={handleOpenModal} />
    </div>
  );
};
