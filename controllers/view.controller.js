let loginView = (req, res) => {
	res.render('login', {
		title: 'Login'
	})
}

let historyView = (req, res) => {
	res.render('history', {
		title: 'History'
	})
}

let homePage = (req, res) => {
	res.render('mainScreen', {
		title: 'Homepage'
	})
}

let uploadImage = (req, res) => {
	res.render('uploadImage', {
		title: 'Upload Image'
	})
}

exports.loginView = loginView;
exports.historyView = historyView;
exports.homePage = homePage;
exports.uploadImage = uploadImage;
