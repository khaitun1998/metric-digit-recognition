const userInfoModel = require('../../models/users/userInfo.js');
const Joi = require('@hapi/joi');

let changePasswordController = (req, res) => {
	const username = req.decoded.data;

	const schema = Joi.object({
		old_password: Joi.string()
			.min(6)
			.required(),

		new_password: Joi.string()
			.min(6)
			.required()
	})

	const result = schema.validate(req.body);

	if(String(result.error) === "undefined"){
		userInfoModel.changePassword(username,
			result.value.old_password,
			result.value.new_password)
			.then(() => {
				res.json({
					success: true,
					message: "Successfully change password"
				});
			})
			.catch(e => {
				res.json({
					success: false,
					message: e
				})
			});
	}
	else{
		res.json({
			success: false,
			message: String(result.error)
		});
	}
};

let updateInfoController = (req, res) => {
	const username = req.decoded.data;

	const schema = Joi.object({
		fullname: Joi.string()
			.required(),

		email: Joi.string()
			.required()
	})

	const result = schema.validate(req.body);

	if(String(result.error) === "undefined"){
		userInfoModel.updateInfo(username,
			result.value.fullname,
			result.value.email)
			.then(() => {
				res.json({
					success: true,
					message: "Successfully update user info"
				})
			})
			.catch(e => {
				res.json({
					success: false,
					message: e
				})
			})
	}
	else{
		res.json({
			success: false,
			message: String(result.error)
		});
	}
}

exports.changePasswordController = changePasswordController;
exports.updateInfoController = updateInfoController;
