import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { SalidaSearch } from './SalidaSearch';
import { SalidaItem } from './SalidaItem';

import { salidaStartLoading } from '../../redux/actions/salidas';

import { Paginate } from '../ui/Paginate';

const initialStatePage = { page: 1, limit: 20, totalPages: 0 };

export const SalidaScreen = ({ history }) => {
  const { seccion } = useSelector((state) => state.auth);
  const [stPage, setStPage] = useState(initialStatePage);
  const [lstOrdSalidas, setLstOrdSalidas] = useState({ data: [], totalPages: 0 });
  const isMountedList = useRef(false);

  useEffect(() => {
    isMountedList.current = true;
    salidaStartLoading(stPage.page, 20, seccion).then((retCollects) => {
      if (isMountedList.current) {
        setLstOrdSalidas({
          data: [...retCollects.data],
          totalPages: retCollects.totalPages,
        });
      }
    });
    return () => (isMountedList.current = false);
  }, [seccion, stPage]);

  const handleOpenModal = () => {
    history.push('/salida/nuevo');
  };

  const handleClickEvent = (event) => {
    const selectOrden = lstOrdSalidas.data.find(
      (item) => item.id === event.currentTarget.id
    );
    history.push(`/salida/${selectOrden.numerosec}`);
  };

  const handlePageClick = (event) => {
    setStPage({ ...stPage, page: event.selected + 1 });
  };

  const handleSumitSearch = (e, sMaterial) => {
    e.preventDefault();
    salidaStartLoading(stPage.page, 20, seccion, sMaterial).then((retCollects) => {
      if (isMountedList.current) {
        setLstOrdSalidas({
          data: [...retCollects.data],
          totalPages: retCollects.totalPages,
        });
      }
    });
  };

  return (
    <React.Fragment>
      <div className="row my-1">
        <SalidaSearch
          handleNewOrden={handleOpenModal}
          handleSearchOrden={handleSumitSearch}
        />
        {lstOrdSalidas.data &&
          lstOrdSalidas.data.map((item) => (
            <SalidaItem
              key={item.id}
              ordsalida={item}
              onClickEvent={handleClickEvent}
              onDblClickEvent={handleClickEvent}
            />
          ))}
        {lstOrdSalidas.totalPages >= 2 && (
          <span className="mt-2">
            <Paginate
              pageCount={lstOrdSalidas.totalPages}
              handlePageClick={handlePageClick}
            />
          </span>
        )}
      </div>
    </React.Fragment>
  );
};
