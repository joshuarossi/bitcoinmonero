import { Meteor } from 'meteor/meteor';
import { Balances } from './balances.js'
import { Tickers } from './tickers.js'

Meteor.methods({
  'test'(){
    console.log('test just called')
    return "test just called"
  },
  'balances.update'(xmr, btc){
    let balance = Balances.findOne({user: this.userId})
    console.log(balance)
    balance.xmr = xmr ? xmr : balance.xmr
    balance.btc = btc ? btc : balance.btc
    Balances.update({'user': this.userId}, balance)
  },
  'convert'(currency, amount){
    let last_price = Tickers.findOne().last_price
    if (currency === 'btc') {
      Balances.update({user: this.userId}, {$inc: {btc: -amount, xmr: amount/last_price}})
    }
    else {
      Balances.update({user: this.userId}, {$inc: {btc: amount*last_price, xmr: -amount}})
    }
  },
  'withdraw'(currency, amount){
    if (Meteor.isServer) {
      console.log(`withdrawal of ${amount} ${currency} for user ${this.userId} `)
    }
  }
})