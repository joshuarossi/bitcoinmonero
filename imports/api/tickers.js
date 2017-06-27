import { Meteor } from 'meteor/meteor';
import WS from 'ws';
import { Mongo } from 'meteor/mongo';

export const Tickers = new Mongo.Collection('tickers');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.startup(()=>{
  let tickers = Tickers.find()
  if (tickers.count() === 0) {
    Tickers.insert({})
  }
  else if (tickers.count() > 1) {
    Tickers.remove({})
    Tickers.insert({})
  }
})

const ticker_fields = [
   "channel_id",
   "bid",
   "bid_size",
   "ask",
   "ask_size",
   "daily_change",
   "daily_change_perc",
   "last_price",
   "volume",
   "high",
   "low"
]

const om = Meteor.bindEnvironment(
  (msg) => {
    msg = JSON.parse(msg.data)
    if (msg[1] !== 'hb' && msg[1] !== undefined) {
      msg = _.object(ticker_fields, msg)
      msg.created = Date.now()
      Tickers.update(Tickers.findOne(), msg)
    }
  })

  const wss = new WS('wss://api.bitfinex.com/ws/')
  wss.onmessage = om
  wss.onopen = () => {
    wss.send(JSON.stringify({
      "event":"subscribe",
      "channel":"ticker",
      "pair":"XMRBTC"
    }))
  }

  wss.onclose = () => {
    const wss = new WS('wss://api.bitfinex.com/ws/')
    wss.onmessage = om
    wss.onopen = () => {
    wss.send(JSON.stringify({
      "event":"subscribe",
      "channel":"ticker",
      "pair":"XMRBTC"
      }))
    }
  }

  Meteor.publish('tickers', function tickerPublication() {
    return Tickers.find();
  });
}