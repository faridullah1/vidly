const mongoose = require('mongoose');
const request = require('supertest');
const { Rental } = require('../../models/rentalModel');
const { User } = require('../../models/userModel');

describe('/api/returns', () => {
	let server;
	let customerId;
	let movieId;
	let rental;
	let token;

	beforeEach(async () => {
		server = require('../../server');
		token = new User().generateAuthToken();
		customerId = mongoose.Types.ObjectId();
		movieId = mongoose.Types.ObjectId();

		rental = new Rental({
			customer: {
				_id: customerId,
				name: '12345',
				phone: '12345'
			},
			movie: {
				_id: movieId,
				title: 'movie title',
				dailyRentalRate: 2
			}
		});

		await rental.save();
	});

	afterEach(async () => {
		await Rental.deleteMany({});
		await server.close();
	});

	it('should works!', async () => {
		const res = await Rental.findById({ _id: rental._id});
		expect(res).not.toBeNull();
	});

	it('should return 401 if client is not logged in', async () => {
		const res = await request(server).post('/api/v1/returns').send({customerId, movieId});

		expect(res.status).toBe(401);
	});

	it('should return 400 if custumerId is not given', async () => {
		const res = await request(server).post('/api/v1/returns').set('x-auth-token', token).send({movieId});

		expect(res.status).toBe(400);
	});

	it('should return 400 if movieId is not given', async () => {
		const res = await request(server).post('/api/v1/returns').set('x-auth-token', token).send({customerId});

		expect(res.status).toBe(400);
	});
});