const mongoose = require ( 'mongoose' ) ;
// define a model

// 1. Create a schema, look like a class
const customerSchema = new mongoose.Schema ( {
    name : {
        type : String,
        required : true // must input name
    },
    industry : String
} ) ;

// mongoose.model ( 'collections's name', schema ) ;
module.exports = mongoose.model ( 'customers',  customerSchema ) ;