const db = require('../database.js');
const func = require('../function.js');

let MetricBoxDigit = Object.create({
	getDigitData: (username, start_month = '', end_month = '') => {
		return new Promise(async (resolve, reject) => {
			try {
				let user = await func.checkUserExist(username),
					queryDB;

				if(start_month === '' && end_month === ''){
					queryDB = 'SELECT * FROM User_MetricBox_Digit WHERE user_id = ? ORDER BY date DESC';

					let queryData = await db.queryDatabase(queryDB, [user.ID]);

					queryData.length > 0 ? resolve(queryData) : reject('No data');
				}
				else if(start_month === '' && end_month !== ''){
					reject('Invalid Input');
				}
				else{
					queryDB = 'SELECT * FROM User_MetricBox_Digit WHERE user_id = ? AND date BETWEEN ? AND ? ORDER BY date DESC';

					start_month = moment(start_month).format('MM/YYYY');
					end_month !== '' ? end_month = moment(end_month).format('MM/YYYY')
						: end_month = moment().format('MM/YYYY');

					let queryData = await db.queryDatabase(queryDB, [user.ID, start_month, end_month]);

					queryData.length > 0 ? resolve(queryData) : reject('No data');
				}
			}
			catch (e) {
				reject(e);
			}
		})
	},

	addDigitData: (username, image_file_name, digit_value) => {
		return new Promise(async (resolve, reject) => {
			try{
				let user = await func.checkUserExist(username),
					queryDB = `INSERT INTO User_MetricBox_Digit(user_id, image_file_name, digit) VALUES (?, ?, ?)`;

				await db.queryDatabase(queryDB, [user.ID, image_file_name, digit_value]);

				resolve('Success');
			}
			catch (e) {
				reject(e);
			}
		})
	},

	updateDigitData: (username, dataID, newValue) => {
		return new Promise(async (resolve, reject) => {
			try{
				let user = await func.checkUserExist(username);

				await func.checkDataIDExist(username, dataID);

				let queryDB = 'UPDATE User_MetricBox_Digit SET digit = ? WHERE ID = ?';

				await db.queryDatabase(queryDB, [newValue, dataID]);

				resolve('Successfully update value');
			}
			catch (e) {

			}
		})
	},

	deleteDigitData: (username, dataID) => {
		return new Promise(async (resolve, reject) => {
			try{
				await Promise.all([func.checkUserExist(username),
					func.checkDataIDExist(username, dataID)]);

				let queryDB = "DELETE FROM User_MetricBox_Digit WHERE ID = ?";

				await db.queryDatabase(queryDB, [dataID]);

				resolve('Successfully delete data');
			}
			catch (e) {
				reject(e);
			}
		})
	}
});

exports.MetricBoxDigit = MetricBoxDigit;
