const db = require("./database.js");

let checkUserExist = username => {
    return new Promise((resolve, reject) => {
        let queryDB = 'SELECT * FROM Accounts WHERE username = ?';
        
        db.queryDatabase(queryDB, [username]).then(r => {
            if(parseInt(r.length) > 0) resolve(r[0])
            else reject("Account not exist!!")
        }).catch(e => {reject(e)})
    })
}

let checkDataIDExist = (username, dataID) => {
    return new Promise(async (resolve, reject) => {
        try{
            let user = await checkUserExist(username),
                queryDB = 'SELECT * FROM User_MetricBox_Digit WHERE ID = ? AND user_id = ?';

            let queryData = await db.queryDatabase(queryDB, [dataID, user.ID]);

            queryData.length > 0 ? resolve(true) : reject(false);
        }
        catch (e) {
            reject(e);
        }

    })
}

// let checkIsRoot = username => {
//     return new Promise((resolve, reject) => {
//         let queryDB = "SELECT privilege FROM Accounts WHERE username = ?";
//
//         db.queryDatabase(queryDB, [username]).then(r => {
//             if(r.length > 0){
//                 if(parseInt(r[0].privilege) === 1){
//                     resolve(true)
//                 }
//                 else reject("Unauthorized Access!!")
//             }
//             else reject("Account not exist!!")
//         }).catch(e => {reject(e)})
//     })
// }

exports.checkUserExist = checkUserExist;
exports.checkDataIDExist = checkDataIDExist;
