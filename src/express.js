const express = require( 'express' ) ;
const app = express( ) ;
const mongoose = require( 'mongoose' ) ;
const Customer = require( './models/customers' ) ; // Schema we created from suppliuer.js
const Supplier = require( './models/suppliers' ) ;

// Read .env file to set environment( npm install dotenv )
const dotenv = require( 'dotenv' ) ;
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
]
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

const supplier = new Supplier( {
    id : 1,
    name : "BuildKing",
    project : "Building Project",
} ) ;

// Conenct to the database
const startServer = async( ) => {
    try {
        await mongoose.connect( CONNECT ) ;
        app.listen ( PORT, ( ) => {
            console.log ( "server is running, port is : " + PORT ) ;
        } ) ;
// if you run twice, .save will save two data to the database
//        await customer.save ( ) ; //  The location where const customer will be save was defined inside customers.js (module.exports)
//        await supplier.save ( ) ;
    } catch( error ) {
        console.log( error.message ) ;
    }
} ;

startServer( ) ;

// GET ( read data from mongoDB ) ( using async function )
// Step 1: Get data from mongoDB ( request for asking data from the frontend, server receive the request then give response )
app.get( '/api/customers', async( request, response ) => {
    console.log ( await mongoose.connection.db.listCollections( ).toArray( ) ) ; // console.log all JSON data from mongooseDB collection
    try {
        const customerResult = await Customer.find( ) ; // .find to grep everything without filter ( Customer is the Schema we created before!)
        const supplierResult = await Supplier.find( ) ;
        // If you want two data response back, you have match the same JSON format
        response.send( { "customer" : customerResult,
                         "supplier" : supplierResult } ) ; // send ^result^ on postman
    } catch( error ) {
        response.status( 500 ).json( { "error" : error.message } ) ; // 500 is Internal Server Error ( HTTP status code registry )
    }
} ) ;
// Step 2: Check data from Postman

app.get( '/', async( request, response ) => { 
    response.send( 'Welcome' ) ;
} ) ;

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
       try {
            await customer.save( ) ;
            response.status( 201 ).json( { "customer" : customer } ) ; // check server's status, 201 means "created"
    } catch( error ) {
        response.status( 400 ).json( { "error" : error.message } ) ; // if error, server status = bad request (400)
    }

} ) ;