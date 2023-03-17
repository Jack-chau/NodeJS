const mongoose = require ( 'mongoose' ) ;

const SupplierSchema = new mongoose.Schema ( {
    name : String ,
    project : String
} ) ;

module.exports = mongoose.model ( 'suppliers', SupplierSchema ) ;