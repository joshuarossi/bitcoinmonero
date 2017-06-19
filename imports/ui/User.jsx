import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';

export default class Ticker extends Component {
  render() {
    return (
      <span className="text">
        <strong>XMR</strong>
        <br></br>
        Balance: {this.props.xmr_balance}
        <br></br>
        <strong>BTC</strong>
        <br></br>
        Balance: {this.props.btc_balance}
        <br></br>
        <button>Convert</button>
      </span>
    )
  }
}