const mongoose = require ( 'mongoose' ) ;
// define a model

// 1. Create a schema, look like a class
const customerSchema = new mongoose.Schema ( {
    name : String ,
    industry : String
} ) ;

// mongoose.model ( 'collections's name', schema ) ;
module.exports = mongoose.model ( 'customers',  customerSchema ) ;