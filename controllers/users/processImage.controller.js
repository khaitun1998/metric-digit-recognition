const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const processImageModel = require('../../models/users/processImage.js');

let img2digitController = async (req, res) => {
	let username = req.decoded.data;

	let uploadedFile = req.files.metric_box_image,
		fileName = `${crypto.createHash('md5').update(uploadedFile.name.split('.')[0]).digest('hex')}.jpg`,
		newFilePath = path.join(__dirname, `/../../public/uploads/`, fileName);

	try{
		await uploadedFile.mv(newFilePath);

	}catch (e) {
		console.log(e)
	}

	console.log(newFilePath);

	try{
		let img2digitResult = await processImageModel.img2digit(username, newFilePath);

		await fs.unlinkSync(newFilePath);

		await res.json({
			success: true,
			data: img2digitResult
		})

	}
	catch (e) {
		try{
			await fs.unlinkSync(newFilePath);
		}
		catch (e_) {
			await res.json({
				success: false,
				message: e
			})
		}

		await res.json({
			success: false,
			message: e
		})
	}
}

exports.img2digitController = img2digitController;
