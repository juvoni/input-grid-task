import React, { Component } from 'react';
import Result from './Result';
import SumField from './SumField';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalFields: {},
      total: 0
    }
  }

  recalculate (id, event) {
    const {totalFields} = this.state
    const value = event.target.value;
    const num = parseFloat(value)
    if (!isNaN(num)) {
      totalFields[id] = num
    } else {
      totalFields[id] = 0
    }
    const total = Object.values(totalFields).reduce((total, val) => total + val, 0)
    this.setState({ totalFields, total})
  }
  render () {
    const { total } = this.state
    return (
      <div className="grid">
        <div className="col"><SumField recalculate={this.recalculate.bind(this, 'one')}/></div>
        <div className="col"><SumField recalculate={this.recalculate.bind(this, 'two')}/></div>
        <div className="col"><SumField recalculate={this.recalculate.bind(this, 'three')}/></div>
        <div className="col"><Result total={total}></Result></div>
      </div>
    )
  }
}

export default Grid;
