const mongoose = require ( 'mongoose' ) ;

// define a model

// 1. Create a schema
const customerSchema = new mongoose.Schema ( {
    name : String ,
    industry : String
} ) ;

// mongoose.model ( 'collection name', schema ) ;
module.exports = mongoose.model ( 'customer',  customerSchema ) ;