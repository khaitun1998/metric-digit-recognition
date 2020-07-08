const db = require('./database.js');
const func = require('./function.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

let login = (username, password) => {
    return new Promise((resolve, reject) => {
        func.checkUserExist(username)
            .then(r => {
                let strPassword = Buffer.from(r.password, 'binary').toString('utf8');

                bcrypt.compare(password, strPassword, (err, result) => {
                    if(err) reject(err)
                    else{
                        let responseObj;

                        if(result === true){
                            let _token = jwt.sign({
                                    data: username,
                                    role: r.privilege
                                },
                                secretKey,
                        {
                                    expiresIn: `${process.env.TOKEN_EXPIRATION}h`
                                });

                            responseObj = {
                                token: _token,
                                username: username,
                                email: r.email,
                                fullname: r.fullname,
                                expires: `${process.env.TOKEN_EXPIRATION}h`,
                                role: r.privilege
                            }

                            resolve(responseObj)
                        }
                        else{
                            reject("Wrong username/password!!");
                        }
                    }
                })
            })
            .catch(err => {reject(err)});
    })
}

let register = (username, password, fullname, email='', privilege='user') => {
    return new Promise((resolve, reject) => {
        func.checkUserExist(username)
            .then(() => {
                reject("Account does existed!!");
            })
            .catch(() => {
                let queryDB = "INSERT INTO Accounts(username, password, fullname, email, privilege) VALUES(?, ?, ?, ?, ?)";

                let hashed_password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

                db.queryDatabase(queryDB, [username, hashed_password, fullname, email, privilege])
                    .then(() => {
                        resolve("Successfully create account " + username);
                    })
                    .catch(e => {reject(e)})
            });
    })
}


exports.login = login;
exports.register = register;
