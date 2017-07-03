import React, { Component } from 'react';
import VacancyShort from "./Components/VacancyShort";
import Filter from "./Components/Filter";
import axios from "axios";
import { Layout, Breadcrumb, Pagination, Card } from 'antd';
const { Header, Content, Footer } = Layout;
import Loader from "./Components/Loader";
import {Link} from "react-router";
import { connect } from 'react-redux';

export class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      current: 1,
      pageSize: 5,

      filterCities: []
    };
    this.getData=this.getData.bind(this);
  }


  getData(){
    const today = new Date();
    const Month = (today.getMonth()+1).toString();
    const curMonth = Month.length>1?Month:`0${Month}`;
    const Day = (today.getDate()).toString();
    const curDay = Day.length>1?Day:`0${Day}`;
    const curDate = `${today.getFullYear()}-${curMonth}-${curDay}`;
    axios.get('https://api.hh.ru/vacancies/', {
      params: {
        date_from: curDate
      }
    })
      .then(response => {
        this.setState({
          data: response.data.items,
          filteredData: response.data.items,
          loading: false,
          total: response.data.items.length,
          currentData: response.data.items.filter((item, index) => index < this.state.pageSize),
          cities: this.getCities(response.data.items)
        });
        this.props.onGetData(this.state.data);
        return response;
      })

  }


  getCities = items => {
    let cities = [];
    items.forEach(item => {
      cities.every(city => city !== item.area.name) && cities.push(item.area.name);
    });
    return cities;
  };

  onChange = page =>{
    const { filteredData, pageSize } = this.state;
    const from = (page-1)*pageSize;
    console.log("from:", from);
    const currentData = filteredData.filter((item, index) => index >= from && index < from + pageSize);
    this.setState({
      current: page,
      currentData
    })

  };

  componentDidMount(){
    this.getData();
  }

  renderLoading() {
    return (
      <Loader/>
    )
  }
  onCityFilterChange = value => {
    console.log("filter changed:", value);
    this.setState({
      filteredData: this.filterData(this.state.data, value),
      filterCities: value,
      total: this.filterData(this.state.data, value).length,
      currentData: this.filterData(this.state.data, value).filter((item, index) => index < this.state.pageSize)
    });
  };

  filterData = (data, cities) => {
    console.log("state data: ", data);
    return cities.length
      ? data.filter(item => cities.some(city => item.area.name === city))
      : data;
  };

  renderData = () => {
    const { currentData, pageSize, current, total, cities } = this.state;
    return (
      <Layout className="layout">
        <Header>
          <div className="logo">
            <img src="https://image.freepik.com/free-icon/no-translate-detected_318-61780.jpg" alt=""/>
          </div>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="data-wrapper">
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Card>
              <Filter cities={cities} onCityFilterChange={this.onCityFilterChange}/>
            </Card>
            {
              currentData.map((item, index)=>(
                <div key={index} className="card-wrap">
                  <VacancyShort item={item}/>
                </div>
              ))
            }
            <Pagination
              showQuickJumper
              total={total}
              onChange={this.onChange}
              current={current}
              pageSize={pageSize}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <div className="wrapper">
        {
          !loading ?
            (<div>{this.renderData()}</div>) :
            (<div>{this.renderLoading()}</div>)
        }
      </div>
    );
  }
}

export default connect (
  state => ({
    testStore: state
  }),
  dispatch => ({
    onGetData: (data) => {
      console.log('Got data');
          dispatch({
            type: 'FETCH_DATA_SUCCESS',
            payload: data
          })
    }
  })
)(App);