import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../redux/actions/ui';
import { usuarioSetActive } from '../../redux/actions/usuarios';
import { UsuarioItem } from './UsuarioItem';
import { UsuarioModal } from './UsuarioModal';
import { AddNewItem } from '../ui/AddNewItem';

export const UsuarioScreen = () => {
  const dispatch = useDispatch();
  const { usuarios: lstUsuarios } = useSelector((state) => state.usuario);

  const handleOpenModal = () => {
    dispatch(uiOpenModal());
  };

  const handleClickEvent = (event) => {
    dispatch(usuarioSetActive(event.currentTarget.id));
    dispatch(uiOpenModal());
  };

  return (
    <div>
      <div className="row mt-1">
        {lstUsuarios.map((item) => (
          <UsuarioItem key={item.rowId} usuario={item} onClickEvent={handleClickEvent} />
        ))}
      </div>

      <AddNewItem handleOpenModal={handleOpenModal} />
      <UsuarioModal />
    </div>
  );
};
