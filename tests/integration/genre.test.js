const request = require('supertest');
const { Genre } = require('../../models/genreModel');
const { User } = require('../../models/userModel');
let server;


describe('/api/genres', () => {
	beforeEach(() => server = require('../../server'));

	afterEach(async() => {
		server.close();
		await Genre.deleteMany({});
	});

	describe('GET /', () => {
		it('should return all genres', async () => {
			await Genre.collection.insertMany([
				{ name: 'genre1'},
				{ name: 'genre2'}
			]);

			const res = await request(server).get('/api/v1/genres');

			expect(res.status).toBe(200);
			expect(res.body.length).toBe(2);
			expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
			expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
		});
	});

	describe('Get /:id', () => {
		it('should return a genre if id is valid', async () => {
			const genre = new Genre({ name: 'genre1'});
			await genre.save();

			const res = await request(server).get('/api/v1/genres/' + genre._id);

			expect(res.status).toBe(200);
			expect(genre).toHaveProperty('name', genre.name);
		});

		it('should return 404 if id is in-valid', async () => {
			const res = await request(server).get('/api/v1/genres/1');

			expect(res.status).toBe(404);
		});
	});

	describe('Post /', () => {
		let token;
		let name;

		const exec = async () => {
			return await request(server)
			.post('/api/v1/genres')
			.set('x-auth-token', token)
			.send({ name });
		};

		beforeEach(() => {
			token = new User().generateAuthToken();
			name = 'genre1';
		});

		it('should return 401 if client is not logged in', async () => {
			token = '';

			const res = await exec();

			expect(res.status).toBe(401);
		});

		it('should return 400 if genre name is less than 5 characters', async () => {
			name = 'ge';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if genre name is more than 50 characters', async () => {
			name = new Array(52).join('a');

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should save genre if it is valid', async () => {
			await exec();

			const genre = Genre.find({ name: 'genre1' });

			expect(genre).not.toBeNull();
		});

		it('should return genre if it is valid', async () => {
			const res = await exec();
			
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('name');
		});
	});
});