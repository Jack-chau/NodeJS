// @ts-nocheck

import { Schema, model } from 'mongoose' ; 
// const mongoose = require ( 'mongoose' ) ; JavaScript
// define a model

interface IOrder {
    desription : string,
    amountInCent : number
} ;

interface ICustomer{
    name : string,
    industry? : string,
    order? : IOrder[]
} ;


// 1. Create a schema, look like a class
const customerSchema = new Schema< ICustomer > ( {
    
    name : {
        type : String,
        required : true // must input name
    },

    industry : String,

    orders : [
        {
            "description" : String,
            "amountInCent" : Number
        }
    ]

} ) ;

// mongoose.model ( 'collections's name', schema ) ;
// module.exports = mongoose.model ( 'customers',  customerSchema ) ;

export const Customer = model( 'customer', customerSchema ) ;