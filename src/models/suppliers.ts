// @ts-nocheck
// const mongoose = require ( 'mongoose' ) ;
import { Schema, model, HydrateDocument, HydratedDocument } from "mongoose";

interface ISupplier {
    name : string,
    project : string,
} ;


const supplierSchema = new Schema< ISupplier > ( {
    name : {
        type : String,
        required : true
    },
    project : { 
        type : String,
        required : true
    }
} ) ;

const Supplier = model( 'supplier', supplierSchema ) ;

// HyydratedDocument for test your configuration
const s: HydratedDocument<ISupplier> = new Supplier( {
    name : 'test_name',
    project : 'test_project',
} ) ;

console.log( s.name ) ;
console.log( s.project ) ;
// module.exports = mongoose.model ( 'suppliers', SupplierSchema ) ;

export default model( 'supplier', supplierSchema ) ;