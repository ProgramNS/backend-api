const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;
const routes = require('./routes/routes');
//declare db , bodyParser
app.use(express.json());
app.use(bodyParser.json());
// endpoint routes
app.get('/' ,(req , res)=>{
    res.status(200).json({
        message : "Get Access To Using API"
    });
});


app.use(routes);



//Running server
app.listen(port , console.log(`Server berjalan pada localhost:${port}`));
