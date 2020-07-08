const jwt = require('jsonwebtoken');

let verifyJWT = (req, res, next) => {
	let token = req.headers['x-access-token'];
	let secretKey = process.env.JWT_SECRET;

	if(token){
		jwt.verify(token, secretKey, (err, decode) => {
			if(err){
				res.json({
					success: false,
					reason: err
				});
			}
			else{
				req.decoded = decode;
				next();
			}
		});
	}
	else{
		res.json({
			success: false,
			reason: "No Token"
		});
	}
};

exports.verify = verifyJWT;
