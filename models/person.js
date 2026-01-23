const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// Define the Person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
   age: {
    type:Number,
     },  
 work: {
    type:string,
    enum:['chef','waiter'],
    required: true
  },
  mobile: {
    type:String,
    required: true
  },
  email: {
    type:String,
    required: true,
    unique:true,
  },
  address:{
    type:String
  },
  salary: {
    type:Number,
    required: true
  },
});
//Create person model
const person=mongoose.model('Person', personSchema);
module.exports= person;