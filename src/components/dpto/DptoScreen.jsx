import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../redux/actions/ui';
import { departamentoSetActive } from '../../redux/actions/departamentos';
import { DptoItem } from './DptoItem';
import { DptoModal } from './DptoModal';
import { AddNewItem } from '../ui/AddNewItem';

export const DptoScreen = () => {
  const dispatch = useDispatch();
  const { departamentos: lstDepartamentos } = useSelector((state) => state.departamento);

  const handleOpenModal = () => {
    dispatch(uiOpenModal());
  };

  const handleClickEvent = (event) => {
    dispatch(departamentoSetActive(event.currentTarget.id));
    dispatch(uiOpenModal());
  };

  return (
    <div>
      <div className="row mt-1">
        {lstDepartamentos.map((item) => (
          <DptoItem
            key={item.rowId}
            departamento={item}
            onClickEvent={handleClickEvent}
          />
        ))}
      </div>

      <AddNewItem handleOpenModal={handleOpenModal} />
      <DptoModal />
    </div>
  );
};
