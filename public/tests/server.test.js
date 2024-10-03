const request = require('supertest');
const app = require('../server');

describe('Server', () => {
  it('should return 200 for GET /', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  it('should return 401 for POST /login with invalid credentials', async () => {
    const res = await request(app).post('/login').send({ email: 'invalid', password: 'invalid' });
    expect(res.status).toBe(401);
  });

  it('should return 200 for POST /login with valid credentials', async () => {
    const res = await request(app).post('/login').send({ email: 'test@example.com', password: 'password' });
    expect(res.status).toBe(200);
  });

  it('should return 201 for POST /create-blog', async () => {
    const res = await request(app).post('/create-blog').send({ title: 'Test Blog', content: 'This is a test blog' });
    expect(res.status).toBe(201);
  });

  it('should return 200 for GET /get-blogs', async () => {
    const res = await request(app).get('/get-blogs');
    expect(res.status).toBe(200);
  });
});