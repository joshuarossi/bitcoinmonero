import { Accounts } from 'meteor/accounts-base';
import { Balances } from '../imports/api/balances.js';
import { Addresses } from '../imports/api/addresses.js';

import '../imports/api/tickers.js'
import '../imports/api/test.js'

Accounts.onCreateUser((options, user) => {
  let balance = Balances.insert({xmr: 0, btc: 0, user: user._id})
  user.balance = balance
  //TODO add address creation here
  let addresses = Addresses.insert({btc: [], xmr: [], user: user._id })
  return user
})