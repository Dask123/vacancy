import React, { Component } from 'react';
import { Card } from "antd"

export default class VacancyShort extends Component {

  render() {
    return (
      <Card title={this.props.item.name} extra={<a href={`details/${this.props.item.id}`}>Подробнее</a>}>
        <label>Требования: </label>
        <span className="vacRequirment">{this.props.item.snippet.requirement}</span><br/>
        <label>Обязанности: </label>
        <span className="vacResponsibility">
          <span dangerouslySetInnerHTML={(() => {return {__html: this.props.item.snippet.responsibility===null?'Не указано':this.props.item.snippet.responsibility}})()}/>
        </span><br/>
        <label>Заработная плата: </label>
        <span className="vacSalary">
          {this.props.item.salary===null?"Договорная":this.props.item.salary.from===null?"Договорная":`от ${this.props.item.salary.from} рублей`}
        </span><br/>
        <label>Компания: </label>
        <span className="vacCompany">{this.props.item.employer.name}</span>
        <span className="vacRegion">, {this.props.item.area.name}</span>
      </Card>
    );
  }
}
