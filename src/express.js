const express = require ( 'express' ) ;
const app = express ( ) ;

app.use ( express.json ( ) ) ;
/* adding middleware which will be able to parse that data passed in through the body, 
    It will basically affect all of the requests coming in */
app.use ( express.urlencoded( { extended : true } ) ) ;

const PORT = 2000 ;
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

app.get ( '/api/customers', ( req, res ) => { 
    res.send ( { "customers" :  customers } ) ;
} ) ;

app.post ( '/', ( req, res ) => {
    res.send ( 'This is a post request' ) ;
} ) ;

app.post ( '/api/customers', ( request, response ) => {
    console.log ( request.body );
    response.send ( request.body ) ; 
} ) ;

app.listen ( PORT , ( ) => {
    console.log ( "Server is running, port is: " + PORT ) ;
} ) ;