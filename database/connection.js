const mysql = require('mysql');

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "api_capstone"
}
);


module.exports = db;



