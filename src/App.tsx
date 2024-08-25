import React from 'react';
import { Provider } from 'react-redux';
import { HistoryRouter } from "redux-first-history/rr6";
import { store, history } from '@redux/configure-store';
import { AppRoutes } from './router/routes';

export const App: React.FC = () => {
  
    return (
        <Provider store={store}>
                <HistoryRouter history={history}>{<AppRoutes />}</HistoryRouter>
        </Provider>
    )
  }