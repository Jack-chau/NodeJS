"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = require("mongoose");
;
;
// 1. Create a schema, look like a class
const customerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true // must input name
    },
    industry: String,
    orders: [
        {
            "description": String,
            "amountInCent": Number
        }
    ]
});
// mongoose.model ( 'collections's name', schema ) ;
// module.exports = mongoose.model ( 'customers',  customerSchema ) ;
exports.Customer = (0, mongoose_1.model)('customer', customerSchema);
