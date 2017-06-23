import { AppContainer } from 'react-hot-loader';
import React from 'react';
import {render} from 'react-dom';
import "./Style/style.css";
import { LocaleProvider } from "antd";
import ruRU from 'antd/lib/locale-provider/ru_RU';
import Root from "./Route/Root";

const rootEl = document.getElementById('root');
const renderApp = () => {
  render(
    <LocaleProvider locale={ruRU}>
      <AppContainer>
        <Root/>
      </AppContainer>
    </LocaleProvider>,
    rootEl
  );
}

renderApp();
if (module.hot) {
  module.hot.accept(() => {
    renderApp();
  });
}
