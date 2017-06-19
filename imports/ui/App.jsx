import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import {Tickers} from '../api/tickers.js';
import {Balances} from '../api/balances.js';

import Ticker from './Ticker.jsx';
import User from './User.jsx';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
  renderTicker() {
    let tickers = this.props.ticker
    let ticker = tickers[0]
    return tickers.map((ticker)=>{
      let time = new Date(ticker.created).toUTCString()
      return (<Ticker key={ticker.created} price={ticker.last_price} time={time}/>)
    })
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>BitcoinMonero</h1>
           <AccountsUIWrapper/>
          <ul>
            {this.renderTicker()}
          </ul>
          {this.props.currentUser ? (<User xmr_balance={this.props.balances.xmr} btc_balance={this.props.balances.btc}/>) : ''}
        </header>
      </div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('tickers');
  Meteor.subscribe('balances');
  return {
    balances: Balances.findOne(),
    ticker: Tickers.find().fetch(),
    currentUser: Meteor.user()
  };
}, App);