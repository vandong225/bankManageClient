import React from 'react';
import PropTypes from 'prop-types';
import { IStoreModel, StoreModel } from './model/store';

const store = StoreModel.create({});

export const StoreContext = React.createContext<IStoreModel>(store);

export const StoreProvider:React.FC = ({ children }) => (
  <StoreContext.Provider value={store}>
    {children}
  </StoreContext.Provider>
);

StoreProvider.propTypes = { children: PropTypes.element.isRequired };
