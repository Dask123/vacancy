/**
 * Created by Пользователь on 23.06.2017.
 */
import React, { Component } from 'react';
import {Spin} from 'antd';


export default class Loader extends Component {

  render() {
    return(
      <div className="loading">
        <Spin tip="Загрузка..."/>
      </div>
    );
  }
}
