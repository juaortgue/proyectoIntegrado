import { success, notFound } from '../../services/response/'
import { Training } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Training.create(body)
    .then((training) => training.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Training.count(query)
    .then(count => Training.find(query, select, cursor)
      .then((trainings) => ({
        count,
        rows: trainings.map((training) => training.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Training.findById(params.id)
    .then(notFound(res))
    .then((training) => training ? training.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Training.findById(params.id)
    .then(notFound(res))
    .then((training) => training ? Object.assign(training, body).save() : null)
    .then((training) => training ? training.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Training.findById(params.id)
    .then(notFound(res))
    .then((training) => training ? training.remove() : null)
    .then(success(res, 204))
    .catch(next)
