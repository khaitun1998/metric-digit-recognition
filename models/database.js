const database = require('mysql');

require('dotenv').config();

const db = database.createPool({
    connectionLimit: 50,
    host: process.env.DB_ADDRESS,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_TABLE
});

let queryDatabase = (queryStatement, params) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, conn) => {
            if(err) reject(err);
            else{
                conn.query(queryStatement, params, (err, data) => {
                    conn.release();
                    if(err) reject(err);
                    else resolve(data);
                })
            }
        })
    })
}

exports.queryDatabase = queryDatabase;
