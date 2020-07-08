const db = require('../database.js');
const func = require('../function.js');
const bcrypt = require('bcrypt');

let changePassword = (username, old_password, new_password) => {
	return new Promise((resolve, reject) => {
		func.checkUserExist(username)
			.then(() => {
				let queryDB = "UPDATE Accounts SET password = ? WHERE username = ?";

				login(username, old_password)
					.then(() => {
						let hashed_new_password = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10))

						db.queryDatabase(queryDB, [hashed_new_password, username])
							.then(() => {
								resolve("Successfully change password");
							})
							.catch(e => {
								reject(e)
							})
					})
					.catch(err => {
						reject(err)
					})
			})
			.catch(e => {
				reject(e)
			})
	})
}

let updateInfo = (username, fullname = '', email = '') => {
	return new Promise(async (resolve, reject) => {
		try{
			await func.checkUserExist(username);

			let queryDB = `UPDATE Accounts SET fullname = ? AND email = ? WHERE username = ?`;

			await db.queryDatabase(queryDB, [fullname, email, username]);

			resolve(`Successfully update user ${username} info`);
		}
		catch (e) {
			reject(e);
		}
	})
}

exports.changePassword = changePassword;
exports.updateInfo = updateInfo;
