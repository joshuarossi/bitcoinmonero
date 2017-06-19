import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'test'(){
    console.log('test just called')
  },
  'balances.update'(){
    console.log('should update balance')
  },
  'convert'(conversion){
    console.log('should convert')
    console.log(conversion)
  }
})