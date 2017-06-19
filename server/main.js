import { Accounts } from 'meteor/accounts-base';
import {Balances} from '../imports/api/balances.js';

import '../imports/api/tickers.js'

Accounts.onCreateUser((options, user) => {
  console.log(options)
  console.log(user)
  let balance = Balances.insert({xmr: 0, btc: 0, user: user._id})
  console.log(balance)
  user.balance = balance
  return user
})