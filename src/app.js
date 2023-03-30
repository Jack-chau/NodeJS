// Here using express for the backend
const express = require( 'express' ) ;
const app = express( ) ;
const mongoose = require( 'mongoose' ) ;
const Customer = require( './models/customers' ) ; // Schema we created from suppliuer.js
const Supplier = require( './models/suppliers' ) ;

// Since backend will not allow frontend using the same url like localhost to avoid malicipus request
// cors package adopted to allow "cross-origin requests to our backend" for "DEVELOPMENT STAGE".
const cors = require( 'cors' ) ;
app.use( cors( ) ) ;

// Read .env file to set environment( npm install dotenv )
const dotenv = require( 'dotenv' ) ;
const { updateOne } = require('./models/customers');
dotenv.config( ) ;

mongoose.set( 'strictQuery', false ) ;

app.use( express.json( ) ) ;
/* adding middleware which will be able to parse that data passed in through the body, 
    It will basically affect all of the requests coming in */
app.use( express.urlencoded( { extended : true } ) ) ;

// Read environment in terminal or 3000
const PORT = process.env.PORT || 3000 ;
const CONNECT = process.env.CONNECT || 'mongodb+srv://chaukaho:Jack123Jack123@cluster0.qazlmln.mongodb.net/?retryWrites=true&w=majority' ;
const customers = [
    {
        "name" : "Caleb",
        "industry" : "music",
    },
    {
        "name" : "John",
        "industry" : "networking",
    },
    {
        "name" : "Sal",
        "industry" : "sport medicient"
    }
] ;

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

const supplier = new Supplier( {
    id : 1,
    name : "BuildKing",
    project : "Building Project",
} ) ;

// Conencting to the database
const startServer = async( ) => {
    try {
        await mongoose.connect( CONNECT ) ;
        app.listen ( PORT, ( ) => {
            console.log( "server is running, port is : " + PORT ) ;
        } ) ;
// if you run twice, .save will save two data to the database
//        await customer.save ( ) ; //  The location where const customer will be save was defined inside customers.js (module.exports)
//        await supplier.save ( ) ;
    } catch( error ) {
        console.log( error.message ) ;
    }
} ;

startServer( ) ;

app.get( '/', async( request, response ) => { 
    response.send( 'Welcome' ) ;
} ) ;

// GET ( read data from mongoDB ) ( using async function )
// Step 1: Get data from mongoDB ( request for asking data from the frontend, server receive the request then give response )
app.get( '/api/customers', async( request, response ) => {
//    console.log( await mongoose.connection.db.listCollections( ).toArray( ) ) ; // shows all collections in mongooseDB in console
    try {
        const customerResult = await Customer.find( ) ; // .find adopted to grep everything without a filter ( Customer is a Schema we created before! )
        // If you want two data response back, you have match the same JSON format
        response.send( { "customer" : customerResult } ) ; // send ^result^ on postman
    } catch( error ) {
        response.status( 500 ).json( { "error" : error.message } ) ; // 500 is Internal Server Error ( HTTP status code registry )
    }
} ) ;

// For supplier
app.get( '/api/suppliers', async( request, response ) => {
    try {
        const supplierResult = await Supplier.find( ) ;
        response.send( { "Supplier" : supplierResult } ) ;
        return ;
    } catch( error ) {
        response.status( 500 ).json( { "error" : error.message } ) ;
        return ;
    }
} ) ;

// Step 2: Check data from Postman
// POST ( post new items to the database )
// User send request from frontend, then server give response.
app.post( '/api/customers', async( request, response ) => {
    console.log( request.body ) ; // check request's body user input from the frontend
/*  
    const customer = new Customer( {
        "name" : request.body.name,  // we are posting data to the database from the frontend, that's why requst.body.name, reqest for user's input
        "industry" : request.body.industry
*/  
       const customer = new Customer( request.body ) ; // for simplicity, post the whold body to the database
       //Be careful, the customer JSON will follow the Customer schema that created in customer.js, 
       try{
            await customer.save( ) ;
            response.status( 201 ).json( { "customer" : customer } ) ; // check server's status, 201 means "created"
    } catch( error ) {
        response.status( 400 ).json( { "error" : error.message } ) ; // if error, server status = bad request (400)
    }
} ) ;

// Update supplier collection in mongoose Atlas
app.post( '/api/suppliers', async( request, response ) => {
    console.log( request.body ) ;
    const supplier = new Supplier( request.body ) ;
    try{ 
        await supplier.save( ) ;
        response.status( 201 ).json( { "supplier" : supplier } ) ;
        return ;
    } catch( error ) {
        response.status( 400 ).json( { "error" : error.message } ) ;
        return ;
    }
} ) ;

// Accept id passed on postman, setup id endpoint
/* For example: user have some request, have to have second variable /:userQuestion 
http://localhost:3005/api/customers/641822cac94afadf20042d43/userQuestion?age=50&state=ohio --> the question is age=50 and state=ohio? */
/*
app.get( '/api/customers/:id/:userQuestion', async( request, response ) => {
    response.json( { "requestParams" : request.params ,
                     "requestQuery" : request.query , 
                    } ) ;
} ) ; // : means variable that require user going to pass
*/

// Get specific items from mongoDB with a filter( customer.params.id ) and return to user:
app.get( '/api/customers/:id', async( request, response ) => {
    try {
/*
        console.log( {
            requestParams : request.params,
            requestQuery : request.query
        } ) ;
*/
        const { id : customerId } = request.params ; // same as const customerID = request.params.id -- this is call destructureuing;
        console.log( "Your request id is: " + customerId ) ;
        // retrive data from mongoDB
        const customer = await Customer.findById( customerId ) ; //retrive data from mongoDB
        // retrive data from database, if not a customer, then user not found.
        if( !customer ) {
            response.status( 404 ).json( { error : "User not found", } ) ; // 404 is not found
            return ; // stop further execution in this callback
        } else {
            response.json( { customer } ) ;
            return ;// stop further execution in this callback
        } ;

    } catch( error ) {
        response.status( 500 ).json( { error: "something wrong" } ) ; //500 is internal server error
        response.status( 490 ).json( { error: "A critical system health error requires the system to be shut down!, remember to add return in loop. " } ) ;
    }
} ) ;

// Get supplier with id filter
app.get( '/api/suppliers/:id', async( request, response ) => {
    try{ 
        const { id : supplierId } = request.params ;
        console.log( 'Your request id is: ' + supplierId ) ;
        const supplier = await Supplier.findById( supplierId ) ;
        if( !supplierId ) { 
            response.status( 404 ).json( { error : "User not found" } ) ;
            return ;
        } else {
            response.json( { supplier } ) ;
            return ;
        } ;
    } catch( error ) {
        response.status( 500 ).json( { error : "something go wrong" } ) ;
        response.status( 490 ).json( { error : "A critical system health error requires the system to be shut down, remember add return"} )
    }
} ) ;

// Updating database, post and put. 
// Create an endpoint to update the database.
// *** use put to update the database

app.put( '/api/customers/:id', async( request, response ) => {
    try {
        const customerId = request.params.id ; 
        // call .replaceOne method, .replaceOne( filter, new update data)
        const result = await Customer.replaceOne( { _id : customerId }, request.body ) ; // we search customer's id and replace it's body, means update a customer's information
        
        // Use findOneAndReplace( update the data, but return the original data to you ) // Not often used 
        // Replace will do is it will take your data change it in the database and return to you the original data
        // const result = await Customer.findOneAndReplace( { _id : customerId }, request.body, { new : true } )
        
        // Use findOneAndDelete to delete something (delete only)
        // const result = await Customer.findOneAndDelete( { _id : customerId }, request.body, { new : true } ) ;
        
        console.log( result ) ;
        response.json( { result } ) ;
    }catch ( error ) {
        console.log( error.messsage ) ;
        response.status( 500 ).json( { error: "something wrong" } ) ;
    }
} ) ;

// Update supplier data by its id: 
app.put( '/api/suppliers/:id', async( request, response ) => {
    try{ 
        const { id : supplierId } = request.params ;
        const result = await Supplier.replaceOne( { _id : supplierId }, request.body ) ;
      
        console.log( result ) ;
        response.json( { updatedCount : result.modifiedCount } ) ;
    } catch ( error ) {
        response.status( 500 ).json( { error : "something go wrong" } ) ;
    }
} ) ;

// Delete items
app.delete( 'api/customers/:id', async( request, response ) => {
    try {
        const customerId = request.params.id ;
        const result = await Customer.deleteOne( { _id : customerId } ) ;
        response.json( { deletedCount : result.deleteCount } ) ;
    } catch( error ) {
        response.status( 500 ).json( { error : "Something went wrong" } ) ;
    }
} ) ; 

// Delete supplier

app.delete( '/api/suppliers/:id', async( request, response ) => {
    try{
        const { id : supplierId } = request.params ;
        // .deleteOne( filter, delete what?) ;
        const result = await Supplier.deleteOne( { _id : supplierId } ) ;
        response.json( { deleteCount : result.deleteCount } ) ;
    } catch( error) {
        response.status( 500 ).json( { error : "something went wrong" } ) ;
    }
} ) ;