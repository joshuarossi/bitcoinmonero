import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { AccountsServer } from 'meteor/accounts-base'

export const Balances = new Mongo.Collection('balances');

if (Meteor.isServer){
  Meteor.publish('balances', function (){
  return Balances.find({user: this.userId})
  })
}
