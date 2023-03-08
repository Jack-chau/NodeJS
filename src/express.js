const express = require ( 'express' ) ;
const app = express ( ) ;
const PORT = 3000 ;

// End point ( PATH, function ) req = request, res = response
app.get ( '/', ( req, res ) => { 
    res.send ( "Retrieve Data" ) ;
} ) ;

app.post ( '/', ( ) => {
    res.send ( 'This is a post request' ) ;
} ) ;

app.listen ( PORT , ( ) => {
    console.log ( "Server is running, port is: " + PORT ) ;
} ) ;