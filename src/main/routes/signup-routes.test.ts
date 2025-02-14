import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  test('Should return an account on success', async () => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Artur',
        email: 'arturhandow@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
