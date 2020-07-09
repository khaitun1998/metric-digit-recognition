const Joi = require('@hapi/joi');
const crypto = require('crypto');
const path = require('path');

const metricBoxDigitModel = require('../../models/users/metricBoxDigit.js');

let getDigitDataController = async (req, res) => {
	let username = req.decoded.data;

	const schema = Joi.object({
		start_month: Joi.string()
			.allow('', null),

		end_month: Joi.string()
			.allow('', null)
	})

	const result = schema.validate(req.query);

	if(String(result.error) === 'undefined'){
		try{
			let data = await metricBoxDigitModel.MetricBoxDigit
				.getDigitData(username, result.value.start_month, result.value.end_month);

			await res.json({
				success: true,
				data: data
			})
		}
		catch (e) {
			await res.json({
				success: false,
				message: e
			})
		}

	}
	else{
		await res.json({
			success: false,
			message: String(result.error)
		})
	}
};

let addDigitDataController = async (req, res) => {
	let username = req.decoded.data;

	const schema = Joi.object({
		digit_value: Joi.number()
			.required()
	})

	const result = schema.validate(req.body);

	if(String(result.error) === 'undefined'){
		try{
			let uploadedFile = req.files.metric_box_image,
				fileName = `${crypto.createHash('md5').update(uploadedFile.name.split('.')[0]).digest('hex')}.jpg`,
				newFilePath = path.join(__dirname, `/../../public/uploads/${username}/`, fileName);

			await uploadedFile.mv(newFilePath);

			await metricBoxDigitModel.MetricBoxDigit
				.addDigitData(username, fileName, result.value.digit_value);

			await res.json({
				success: true
			})
		}
		catch (e) {
			console.log(e);
			await res.json({
				success: false,
				message: e
			})
		}
	}
	else{
		await res.json({
			success: false,
			message: String(result.error)
		})
	}
};

let updateDigitDataController = async (req, res) => {
	let username = req.decoded.data,
		dataID = req.params.dataID;

	const schema = Joi.object({
		newValue: Joi.number()
			.required()
	})

	const result = schema.validate(req.body);

	if(String(result.error) === 'undefined'){
		await metricBoxDigitModel.MetricBoxDigit
			.updateDigitData(username, dataID, result.value.newValue);

		await res.json({
			success: true
		})
	}
	else{
		await res.json({
			success: false,
			message: String(result.error)
		})
	}
};

let deleteDigitDataController = async (req, res) => {
	let username = req.decoded.data,
		dataID = req.params.dataID;

	await metricBoxDigitModel.MetricBoxDigit
		.deleteDigitData(username, dataID);

	await res.json({
		success: true
	})
}

exports.getDigitDataController = getDigitDataController;
exports.addDigitDataController = addDigitDataController;
exports.updateDigitDataController = updateDigitDataController;
exports.deleteDigitDataController = deleteDigitDataController;
