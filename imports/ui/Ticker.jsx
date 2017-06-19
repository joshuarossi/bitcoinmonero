import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';

export default class Ticker extends Component {
  render() {
    return (
      <span className="text">
        BTC to XMR
        <br></br>
        <strong>PRICE: {this.props.price}</strong>
        <br></br>
        Time: {this.props.time}
      </span>
    )
  }
}

Ticker.propTypes = {
};