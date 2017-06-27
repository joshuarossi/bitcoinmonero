import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { AccountsServer } from 'meteor/accounts-base'

export const Addresses = new Mongo.Collection('addresses');

if (Meteor.isServer){
  Meteor.publish('addresses', function (){
  return Addresses.find({user: this.userId})
  })
}