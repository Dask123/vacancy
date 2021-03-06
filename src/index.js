import { AppContainer } from 'react-hot-loader';
import React from 'react';
import {render} from 'react-dom';
import { LocaleProvider } from "antd";
import ruRU from 'antd/lib/locale-provider/ru_RU';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools  } from 'redux-devtools-extension';

import Root from './Route/Root';
import './Style/style.css';
import { dataReducer } from './Reducers/reducer'

const store = createStore(dataReducer, composeWithDevTools(applyMiddleware(thunk)));
const rootEl = document.getElementById('root');


const renderApp = () => {
  render(

    <Provider store={store}>
      <LocaleProvider locale={ruRU}>
        <AppContainer>
          <Root/>
        </AppContainer>
      </LocaleProvider>
    </Provider>,
    rootEl
  );
}

renderApp();
if (module.hot) {
  module.hot.accept(() => {
    renderApp();
  });
}
