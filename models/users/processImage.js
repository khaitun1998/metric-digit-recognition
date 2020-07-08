const path = require('path');
const func = require('../function.js');
const spawn = require('child_process').spawn;

let img2digit = (username, image_path) => {
	return new Promise(async (resolve, reject) => {
		try{
			await func.checkUserExist(username);

			let pyProgram = spawn(path.join(__dirname, '/../metric_box_digit/bin/python3'),
					[path.join(__dirname, '/../metric_digit_recognize/testReader.py'), image_path]);

			pyProgram.stdout.on('data', data => {
				let tmp = new Buffer.from(String.fromCharCode.apply(null, data));
				resolve(tmp.toString());
			});

			// pyProgram.stderr.on('data', data => {
			// 	let tmp = String.fromCharCode.apply(null, data);
			// 	console.log(tmp)
			// 	reject(tmp.toString());
			// });
		}
		catch (e) {
			reject(e);
		}
	})
}

exports.img2digit = img2digit;
