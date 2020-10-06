import React from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import './styles.css';

const Row = ({ index, style }) => (
  <div className="list-group-item list-group-item-action" style={style}>
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1 text-uppercase text-primary font-weight-bolder">
        equipo nombre {index}
      </h5>
      <small class="text-muted">3 days ago</small>
    </div>
    <p class="mb-1">
      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus -{' '}
      <span className="font-italic">varius blandit.</span>
    </p>
    <span class="text-muted font-italic font-weight-bold">Persona</span>
    {' - '}
    <span class="text-muted font-italic font-weight-bold">Placa</span>
  </div>
);

export const SalidaScreen = () => {
  return (
    <div className="root mt-1">
      <input type="text" name="" className="mb-2" placeholder="Indique buscar" />
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="list-group"
            height={height}
            itemCount={10000}
            itemSize={140}
            width={width}>
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};
