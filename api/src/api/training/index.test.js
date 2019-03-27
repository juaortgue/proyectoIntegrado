import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Training } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, training

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  training = await Training.create({})
})

test('POST /training 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', description: 'test', target: 'test', time: 'test', picture: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.target).toEqual('test')
  expect(body.time).toEqual('test')
  expect(body.picture).toEqual('test')
})

test('POST /training 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /training 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /training 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /training 401 (admin)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('GET /training 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /training 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /training/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${training.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(training.id)
})

test('GET /training/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${training.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('GET /training/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${training.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /training/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${training.id}`)
  expect(status).toBe(401)
})

test('GET /training/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /training/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${training.id}`)
    .send({ access_token: adminSession, name: 'test', description: 'test', target: 'test', time: 'test', picture: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(training.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.target).toEqual('test')
  expect(body.time).toEqual('test')
  expect(body.picture).toEqual('test')
})

test('PUT /training/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${training.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /training/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${training.id}`)
  expect(status).toBe(401)
})

test('PUT /training/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', description: 'test', target: 'test', time: 'test', picture: 'test' })
  expect(status).toBe(404)
})

test('DELETE /training/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${training.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /training/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${training.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /training/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${training.id}`)
  expect(status).toBe(401)
})

test('DELETE /training/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
