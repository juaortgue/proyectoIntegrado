import { success, notFound } from '../../services/response/'
import { Gym } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Gym.create(body)
    .then((gym) => gym.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Gym.count(query)
    .then(count => Gym.find(query, select, cursor)
      .then((gyms) => ({
        count,
        rows: gyms.map((gym) => gym.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Gym.findById(params.id)
    .then(notFound(res))
    .then((gym) => gym ? gym.view(true) : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Gym.findById(params.id)
    .then(notFound(res))
    .then((gym) => gym ? Object.assign(gym, body).save() : null)
    .then((gym) => gym ? gym.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Gym.findById(params.id)
    .then(notFound(res))
    .then((gym) => gym ? gym.remove() : null)
    .then(success(res, 204))
    .catch(next)
