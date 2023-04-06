"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
// const mongoose = require ( 'mongoose' ) ;
const mongoose_1 = require("mongoose");
;
const supplierSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    }
});
const Supplier = (0, mongoose_1.model)('supplier', supplierSchema);
// HyydratedDocument for test your configuration
const s = new Supplier({
    name: 'test_name',
    project: 'test_project',
});
console.log(s.name);
console.log(s.project);
// module.exports = mongoose.model ( 'suppliers', SupplierSchema ) ;
exports.default = (0, mongoose_1.model)('supplier', supplierSchema);
