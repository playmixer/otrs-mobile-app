import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store/store';
import Index from './app/index';

export default function App() {
  return (
    <Provider store={store}>
      <Index/>
    </Provider>
  )
};