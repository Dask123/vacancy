import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import axios from 'axios';
import Loader from "./Loader";
import { Layout, Breadcrumb, Card } from 'antd';
import moment from 'moment';
import {Link} from 'react-router';

const { Header, Content, Footer } = Layout;


export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading: true
    }
  }



  getData=()=>{
    axios.get(`https://api.hh.ru/vacancies/${this.props.params.id}`)
      .then(response => {
        this.setState({
          data: response.data,
          loading: false
        });
        console.log(this.state.data);
        return response;
      })

  };

  componentDidMount(){
    this.getData();

  }

  renderData=()=>{
    return(
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
          <Card title={this.state.data.name}>
            <div dangerouslySetInnerHTML={(() => {return {__html: this.state.data.description}})()}/>
            <p><b>Тип занятости:</b><br/> {this.state.data.employment.name}</p>
            <p><b>Опыт работы:</b><br/> {this.state.data.experience.name}</p>
            <p><b>Заработная плата:</b><br/> от {this.state.data.salary.from} рублей</p>
            <p><b>График:</b><br/>{this.state.data.schedule.name}</p>
            <p><b>Регион:</b><br/> {this.state.data.area.name}</p>
            <p><b>Компания:</b><br/>{this.state.data.employer.name}</p>
            <p>
              <b>Ссылка работодателя на HeadHunter:</b><br/>
              <a href={this.state.data.employer.alternate_url}>
                {this.state.data.employer.alternate_url}
              </a>
            </p>
            <p>
              <b>Дата публикации:</b><br/>
              {moment(this.state.data.created_at).format('L')}
            </p>
          </Card>
        </div>
      </Content>
    <Footer style={{ textAlign: 'center' }}>
    Ant Design ©2016 Created by Ant UED
    </Footer>
    </Layout>
    )
  };

  renderLoading=()=>{
    return(
      <Loader/>
    )
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
