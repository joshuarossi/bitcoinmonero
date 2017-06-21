import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';

export default class Converter extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    Meteor.call('convert', this.refs.currency.value, this.input.value)
    this.input.value = ''
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <select ref="currency">
            <option value="btc">BTC</option>
            <option value="xmr">XMR</option>
          </select>
          <input type="number" step="any" ref={(input) => this.input = input} />
        </label>
        <br></br>
        <input type="submit" value="Convert" />
      </form>
    )
  }
}