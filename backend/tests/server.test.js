import request from 'supertest';
import { app } from '../server.js';

describe('Server Basic Tests', () => {
  test('GET / should return NexusOS API Running', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('NexusOS API Running');
  });
});
