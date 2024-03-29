const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
	const token = req.header('x-auth-token');
	if (!token) return res.status(401).send('Access denied. No token provided.');

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		if (!decodedToken) return res.status(401).send('Invalid token.');
		
		req.user = decodedToken;
		next();
	}
	catch(err) {
		res.status(400).send('Invalid Token.');
	}
};