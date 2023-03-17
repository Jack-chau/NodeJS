const express = require ( 'express' ) ;
const app = express ( ) ;
const mongoose = require ( 'mongoose' ) ;
const Customer = require ( './models/customers' ) ;
const Supplier = require ( './models/suppliers' ) ;

// Read .env file to set environment ( npm install dotenv )
const dotenv = require ( 'dotenv' ) ;
dotenv.config ( ) ;

mongoose.set ( 'strictQuery', false ) ;

app.use ( express.json ( ) ) ;
/* adding middleware which will be able to parse that data passed in through the body, 
    It will basically affect all of the requests coming in */
app.use ( express.urlencoded( { extended : true } ) ) ;

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
// End point ( PATH, function ) req = request, res = response
/*
app.get ( '/', ( request, response ) => {
    response.send ( "Hello" ) ;
} ) ;
*/

/*
app.get ( '/api/customers', ( req, res ) => { 
    res.send ( { "customers" :  customers } ) ;
} ) ;

app.post ( '/', ( req, res ) => {
    res.send ( 'This is a post request' ) ;
} ) ;

app.post ( '/api/customers', ( request, response ) => {
    console.log ( request.body )
    response.send ( "Here is reponse from the server"  )
} ) ;

const start = async ( ) => {
    try {
        await mongoose.connect ( 'mongodb+srv://chaukaho:Jack123Jack123@cluster0.qazlmln.mongodb.net/?retryWrites=true&w=majority' ) ;

        app.listen( PORT , ( ) => {
            console.log ( "Server is running, port is: " + PORT ) ;
        } ) ;
    } catch ( error ) {
        console.log ( error.message ) ;
    }
} ;
*/

// Create an object that defined from './models/customers'
const customer = new Customer ( {
    name : 'Jack',
    industry : 'marketing',
} ) ; 

const supplier = new Supplier ( {
    name : "BuildKing",
    project : "Building Project",
} ) ;

/*
app.get ( '/api/customer', async( request, response ) => {
    const result = await customers.find ( ) ;
    response.send ( { "customer" : result } ) ;
} ) ; 
*/
const startGetCustomer = async ( ) => {
    try {
        await mongoose.connect ( CONNECT ) ;
        app.listen ( PORT, ( ) => {
            console.log ( "server is running, port is : " + PORT ) ;
        } ) ;
        await customer.save ( ) ; //  The location where const customer will be save was defined inside customers.js (module.exports)
        await supplier.save ( ) ;
    } catch ( error ) {
        console.log ( error.message ) ;
    }
} ;

/*
const getSupplier = async ( ) => {
    try {
        await mongoose.connect ( CONNECT ) ;
        app.listen ( PORT, ( ) => {
            console.log ( "The server is running on PORT: " + PORT ) ;
        } ) ;
        await supplier.save ( ) ;
    } catch ( error ) {
        console.log ( error.message ) ;
    }
} ;
*/

startGetCustomer ( ) ;
