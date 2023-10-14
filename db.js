const mysql = require('mysql2/promise');

const pool =mysql.createPool({
    host:"localhost" ,
    // 127.0.0.1,
    user:'root',
    password:'randy',
    port:3307,
    database:'to_do_app',
    connectionLimit:10
})



module.exports = pool

