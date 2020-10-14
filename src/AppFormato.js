import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/stores/store';
import { AppRouter } from './routes/AppRouter';

export const AppFormato = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
