const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User } = require("../../../models/userModel");


describe('user.generateAuthToken', () => {
	it('Should return a valid JWT', () => {
		const payload = { _id: new mongoose.Types.ObjectId(), isAdmin: true };
		const user = new User(payload);
		const token = user.generateAuthToken();
		const decoded = JWT.verify(token, process.env.JWT_PRIVATE_KEY);

		expect(decoded).toMatchObject(payload);
	});
});