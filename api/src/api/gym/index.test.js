import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Gym } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, gym

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  gym = await Gym.create({})
})

test('POST /gyms 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', address: 'test', province: 'test', city: 'test', zipcode: 'test', position: 'test', price: 'test', description: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.province).toEqual('test')
  expect(body.city).toEqual('test')
  expect(body.zipcode).toEqual('test')
  expect(body.position).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.description).toEqual('test')
})

test('POST /gyms 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /gyms 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /gyms 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /gyms 401 (admin)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('GET /gyms 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /gyms 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /gyms/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${gym.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(gym.id)
})

test('GET /gyms/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${gym.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('GET /gyms/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${gym.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /gyms/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${gym.id}`)
  expect(status).toBe(401)
})

test('GET /gyms/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /gyms/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${gym.id}`)
    .send({ access_token: adminSession, name: 'test', address: 'test', province: 'test', city: 'test', zipcode: 'test', position: 'test', price: 'test', description: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(gym.id)
  expect(body.name).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.province).toEqual('test')
  expect(body.city).toEqual('test')
  expect(body.zipcode).toEqual('test')
  expect(body.position).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.description).toEqual('test')
})

test('PUT /gyms/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${gym.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /gyms/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${gym.id}`)
  expect(status).toBe(401)
})

test('PUT /gyms/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', address: 'test', province: 'test', city: 'test', zipcode: 'test', position: 'test', price: 'test', description: 'test' })
  expect(status).toBe(404)
})

test('DELETE /gyms/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${gym.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /gyms/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${gym.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /gyms/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${gym.id}`)
  expect(status).toBe(401)
})

test('DELETE /gyms/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
