import React, { Component } from 'react';
import {Select} from 'antd';
const Option = Select.Option;


const Filter = ({ cities, onCityFilterChange }) => {
  return (
    <div className="filter">
      FILTER
      <Select
        mode="multiple"
        style={{width: '100%'}}
        placeholder="Выберите город"
        onChange={onCityFilterChange}
      >
        {
          cities.map(city => <Option key={city}>{city}</Option>)
        }
      </Select>
    </div>
  )
};
export default  Filter;