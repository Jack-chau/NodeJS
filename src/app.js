"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Here using express for the backend
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const Customer = require( './models/customers' ) ; // Schema we created from suppliuer.js (JavaScript)
const customers_1 = require("./models/customers"); // Typescript
const suppliers_1 = __importDefault(require("./models/suppliers")); // same as Customer, but you can change name here
// Since backend will not allow frontend using the same url like localhost to avoid malicipus request
// cors package adopted to allow "cross-origin requests to our backend" for "DEVELOPMENT STAGE".
const cors = require('cors');
app.use(cors());
// Read .env file to set environment( npm install dotenv )
const dotenv = require('dotenv');
const { updateOne } = require('./models/customers');
dotenv.config();
mongoose.set('strictQuery', false);
app.use(express.json());
/* adding middleware which will be able to parse that data passed in through the body,
    It will basically affect all of the requests coming in */
app.use(express.urlencoded({ extended: true }));
// Read environment in terminal or 3000
const PORT = process.env.PORT || 3000;
const CONNECT = process.env.CONNECT || 'mongodb+srv://chaukaho:Jack123Jack123@cluster0.qazlmln.mongodb.net/?retryWrites=true&w=majority';
const customers = [
    {
        "name": "Caleb",
        "industry": "music",
    },
    {
        "name": "John",
        "industry": "networking",
    },
    {
        "name": "Sal",
        "industry": "sport medicient"
    }
];
// End point( PATH, function ) req = request, res = response
/*
app.get ( '/', ( request, response ) => {
    response.send ( "Hello" ) ;
} ) ;
*/
/*
app.get( '/api/customers', ( req, res ) => {
    res.send( { "customers" :  customers } ) ;
} ) ;

app.post( '/', ( req, res ) => {
    res.send( 'This is a post request' ) ;
} ) ;

app.post( '/api/customers', ( request, response ) => {
    console.log( request.body )
    response.send( "Here is reponse from the server"  )
} ) ;

const start = async( ) => {
    try {
        await mongoose.connect ( 'mongodb+srv://chaukaho:Jack123Jack123@cluster0.qazlmln.mongodb.net/?retryWrites=true&w=majority' ) ;

        app.listen( PORT , ( ) => {
            console.log ( "Server is running, port is: " + PORT ) ;
        } ) ;
    } catch( error ) {
        console.log( error.message ) ;
    }
} ;
*/
// Create an object that defined from './models/customers'
/*
const customer = new Customer( {
    id : 1,
    name : 'Jack',
    industry : 'marketing',
    },
    {
        id : 2,
        name : "June",
        industry : "IT",
    },
) ;
*/
const supplier = new suppliers_1.default({
    id: 1,
    name: "BuildKing",
    project: "Building Project",
});
// Conencting to the database
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(CONNECT);
        app.listen(PORT, () => {
            console.log("server is running, port is : " + PORT);
        });
        // if you run twice, .save will save two data to the database
        //        await customer.save ( ) ; //  The location where const customer will be save was defined inside customers.js (module.exports)
        //        await supplier.save ( ) ;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        else {
            console.log('Unexpected error', error);
        }
    }
});
startServer();
app.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send('Welcome!!');
}));
// GET ( read data from mongoDB ) ( using async function )
// Step 1: Get data from mongoDB ( request for asking data from the frontend, server receive the request then give response )
app.get('/api/customers', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    //    console.log( await mongoose.connection.db.listCollections( ).toArray( ) ) ; // shows all collections in mongooseDB in console
    try {
        const customerResult = yield customers_1.Customer.find(); // .find adopted to grep everything without a filter ( Customer is a Schema we created before! )
        // If you want two data response back, you have match the same JSON format
        response.send({ "customer": customerResult }); // send ^result^ on postman
        /* JavaScript Style
            } catch( error : unknown  ) {
                response.status( 500 ).json( { "error" : error.message } ) ; // 500 is Internal Server Error ( HTTP status code registry )
            }
        */
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ "error": error.message });
        }
        else {
            console.log('Unexpected error', error);
        }
    }
}));
// For supplier
app.get('/api/suppliers', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplierResult = yield suppliers_1.default.find();
        response.send({ "Supplier": supplierResult });
        return;
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ "error": error.message });
        }
        else {
            console.log('Unexpected error', error);
        }
    }
}));
// Step 2: Check data from Postman
// POST ( post new items to the database )
// User send request from frontend, then server give response.
app.post('/api/customers', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(request.body); // check request's body user input from the frontend
    /*
        const customer = new Customer( {
            "name" : request.body.name,  // we are posting data to the database from the frontend, that's why requst.body.name, reqest for user's input
            "industry" : request.body.industry
    */
    const customer = new customers_1.Customer(request.body); // for simplicity, post the whold body to the database
    //Be careful, the customer JSON will follow the Customer schema that created in customer.js, 
    try {
        yield customer.save();
        response.status(201).json({ "customer": customer }); // check server's status, 201 means "created"
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(400).json({ "error": error.message });
        }
        else {
            console.log('Unexpected error', error);
        }
    }
}));
// Update supplier collection in mongoose Atlas
app.post('/api/suppliers', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(request.body);
    const supplier = new suppliers_1.default(request.body);
    try {
        yield supplier.save();
        response.status(201).json({ "supplier": supplier });
        return;
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(400).json({ "error": error.message });
        }
        else {
            console.log('Unexpected error', error);
        }
    }
}));
// Accept id passed on postman, setup id endpoint
/* For example: user have some request, have to have second variable /:userQuestion
http://localhost:3005/api/customers/641822cac94afadf20042d43/userQuestion?age=50&state=ohio --> the question is age=50 and state=ohio? */
/*
app.get( '/api/customers/:id/:userQuestion', async( request : Request, response : Response ) => {
    response.json( { "requestParams" : request.params ,
                     "requestQuery" : request.query ,
                    } ) ;
} ) ; // : means variable that require user going to pass
*/
// Get specific items from mongoDB with a filter( customer.params.id ) and return to user:
/*
app.get( '/api/customers/:id', async( request : Request, response : Response ) => {
    try {
        console.log( {
            requestParams : request.params,
            requestQuery : request.query
        } ) ;
        const { id : customerId } = request.params ; // same as const customerID = request.params.id -- this is call destructureuing;
        console.log( "Your request id is: " + customerId ) ;
        // retrive data from mongoDB
        const customer = await Customer.findOne( customerId ) ; //retrive data from mongoDB
        // retrive data from database, if not a customer, then user not found.
        if( !customer ) {
            response.status( 404 ).json( { error : "User not found", } ) ; // 404 is not found
            return ; // stop further execution in this callback
        } else {
            response.json( { customer } ) ;
            return ;// stop further execution in this callback
        } ;

    } catch( error : unknown  ) {
        response.status( 500 ).json( { error: "something wrong" } ) ; //500 is internal server error
        response.status( 490 ).json( { error: "A critical system health error requires the system to be shut down!, remember to add return in loop. " } ) ;
    }

    } catch( error ) {
        if ( error instanceof Error ) {
            response.status( 500 ).json( { error: "something wrong" } ) ;
            response.status( 490 ).json( { error: "A critical system health error requires the system to be shut down!, remember to add return in loop. " } ) ;
        } else {
            console.log( 'Unexpected error', error ) ;
        }
    }
} ) ;
*/
// Get supplier with id filter
app.get('/api/suppliers/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: supplierId } = request.params;
        console.log('Your request id is: ' + supplierId);
        const supplier = yield suppliers_1.default.findById(supplierId);
        if (!supplierId) {
            response.status(404).json({ error: "User not found" });
            return;
        }
        else {
            response.json({ supplier });
            return;
        }
        ;
        /*
            } catch( error : unknown  ) {
                response.status( 500 ).json( { error : "something go wrong" } ) ;
                response.status( 490 ).json( { error : "A critical system health error requires the system to be shut down, remember add return"} )
        */
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: "something wrong" });
            response.status(490).json({ error: "A critical system health error requires the system to be shut down!, remember to add return in loop. " });
        }
        else {
            console.log('Unexpected error', error);
        }
    }
}));
// Updating database, post and put. 
// Create an endpoint to update the database.
// *** use put to update the database
app.put('/api/customers/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = request.params.id;
        // call .replaceOne method, .replaceOne( filter, new update data)
        const result = yield customers_1.Customer.replaceOne({ _id: customerId }, request.body); // we search customer's id and replace it's body, means update a customer's information
        // Use findOneAndReplace( update the data, but return the original data to you ) // Not often used 
        // Replace will do is it will take your data change it in the database and return to you the original data
        // const result = await Customer.findOneAndReplace( { _id : customerId }, request.body, { new : true } )
        // Use findOneAndDelete to delete something (delete only)
        // const result = await Customer.findOneAndDelete( { _id : customerId }, request.body, { new : true } ) ;
        console.log(result);
        response.json({ result });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        else {
            console.log('Unexpected error', error);
        }
    }
}));
// Update supplier data by its id: 
app.put('/api/suppliers/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: supplierId } = request.params;
        const result = yield suppliers_1.default.replaceOne({ _id: supplierId }, request.body);
        console.log(result);
        response.json({ updatedCount: result.modifiedCount });
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: "something go wrong" });
        }
        else {
            console.log('Unexpected error', error);
        }
    }
}));
// Implement Patch
app.patch('/api/customers/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: customerId } = request.params;
        const customer = yield customers_1.Customer.findOneAndUpdate({ _id: customerId }, request.body, { new: true });
        console.log(customer); // check whether the customer has been updated
        response.json({ customer }); // response to check customer on the API.
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: "something go wrong" });
        }
        else {
            console.log('Unexpected error', error);
        }
    }
}));
app.patch('/api/order/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(request.params);
    const orderId = request.params.id;
    // Prevent order's id change when we update the field
    request.body._id = orderId;
    // we only pass the orderId into the API, therefore the id we got is Order's id which is the object inside customer
    try {
        const result = yield customers_1.Customer.findOneAndUpdate(
        //Inside the customer, go into the order attribute and then into that order's id
        { 'orders._id': orderId }, // we grep the customer's order by it's order id
        // set is an attribute then we provide an object {} for update
        // 'order.$' means we go to the order's property and see what can match with the id, then we subsitute with request body
        // set just like an update
        { $set: { 'orders.$': request.body } }, { new: true });
        console.log(result);
        if (result) {
            response.json(result);
        }
        else {
            response.status(404).json({ "error": "Order's id not found" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: "something go wrong" });
        }
        else {
            console.log('Unexpected error', error);
        }
    }
}));
app.patch('/api/suppliers/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: supplierId } = request.params;
        const supplier = yield suppliers_1.default.findOneAndReplace({ _id: supplierId }, request.body, { new: true });
        console.log(supplier);
        response.json({ supplier });
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: "something go wrong" });
        }
        else {
            console.log('Unexpected error', error);
        }
    }
}));
// Delete items
app.delete('api/customers/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = request.params.id;
        const result = yield customers_1.Customer.deleteOne({ _id: customerId });
        response.json({ deletedCount: result.deletedCount });
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: "something go wrong" });
        }
        else {
            console.log('Unexpected error', error);
        }
    }
}));
// Delete supplier
app.delete('/api/suppliers/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: supplierId } = request.params;
        // .deleteOne( filter, delete what?) ;
        const result = yield suppliers_1.default.deleteOne({ _id: supplierId });
        response.json({ deleteCount: result.deletedCount });
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: "something go wrong" });
        }
        else {
            console.log('Unexpected error', error);
        }
    }
}));
/*
Reference:
    handeling try, catch error:
    1. https://www.jiyik.com/tm/xwzj/prolan_1843.html
*/ 
