const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const moment = require('moment');
const axios = require('axios')

const processImageModel = require('../../models/users/processImage.js');

async function downloadFile (url, filePath) {
	const writer = fs.createWriteStream(filePath)

	const response = await axios({
		url,
		method: 'GET',
		responseType: 'stream'
	})

	response.data.pipe(writer)

	return new Promise((resolve, reject) => {
		writer.on('finish', resolve)
		writer.on('error', reject)
	})
}

let img2digitController = async (req, res) => {
	let username = req.decoded.data;

	let uploadedFile = req.files.metric_box_image,
		fileName = `${crypto.createHash('md5').update(uploadedFile.name.split('.')[0]).digest('hex')}.jpg`,
		newFilePath = path.join(__dirname, `/../../public/uploads/`, fileName);

	try{
		await uploadedFile.mv(newFilePath);

	}
	catch (e) {
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

let img2digitMobileController = async (req, res) => {
	let username = req.decoded.data,
		img_link = req.body.img_link;

	let filePath = path.join(__dirname, '../../public/uploads/', `${moment().unix()}.jpg`)

	try{
		await downloadFile(img_link, filePath);

		let img2digitResult = await processImageModel.img2digit(username, filePath);

		await res.json({
			success: true,
			data: img2digitResult
		})

		fs.unlinkSync(filePath);
	}
	catch (e) {
		try{
			await fs.unlinkSync(filePath);
		}
		catch (e_) {
			await res.json({
				success: false,
				message: e_
			})
		}

		console.log(e);
		await res.json({
			success: false,
			message: e
		})
	}
}

exports.img2digitController = img2digitController;
exports.img2digitMobileController = img2digitMobileController;
exports.downloadFile = downloadFile;
