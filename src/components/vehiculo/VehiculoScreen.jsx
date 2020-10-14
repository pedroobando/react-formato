import React from 'react';
import { VehiculoItem } from './VehiculoItem';
import { VehiculoModal } from './VehiculoModal';
import { AddNewItem } from '../ui/AddNewItem';

const lstVehiculos = [
  {
    rowId: '001',
    placa: 'bah-12p',
    marca: 'toyota',
    modelo: 'starlet',
    color: 'plata',
  },
  {
    rowId: '003',
    placa: 'DER39823',
    marca: 'toyota',
    modelo: 'COROLLA',
    color: 'BLANCO',
  },
  {
    rowId: '002',
    placa: 'DER-3982-3',
    marca: 'Ford',
    modelo: 'Fiesta',
    color: 'AZUL',
  },
  {
    rowId: '004',
    placa: 'ABC-1245',
    marca: 'SUBARU',
    modelo: 'C-5',
    color: 'BLANCO / ROJO',
  },
  {
    rowId: '005',
    placa: 'ROD-9446',
    marca: 'TOYOTA',
    modelo: 'COROLLA',
    color: 'NEGRO',
  },
  {
    rowId: '006',
    placa: 'PEW-23D',
    marca: 'NISAN',
    modelo: 'J3',
    color: 'GRIS',
  },
];

export const VehiculoScreen = () => {
  // const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    console.log('Abrir');
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
        {lstVehiculos.map((item) => (
          <VehiculoItem
            key={item.rowId}
            vehiculo={item}
            onClickEvent={handleClickEvent}
            onDblClickEvent={handleDobleClick}
          />
        ))}
      </div>
      <AddNewItem handleOpenModal={handleOpenModal} />
      <VehiculoModal />
    </div>
  );
};
