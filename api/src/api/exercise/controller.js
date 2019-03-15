import { success, notFound } from '../../services/response/'
import { Exercise } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Exercise.create(body)
    .then((exercise) => exercise.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Exercise.count(query)
    .then(count => Exercise.find(query, select, cursor)
      .then((exercises) => ({
        count,
        rows: exercises.map((exercise) => exercise.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Exercise.findById(params.id)
    .then(notFound(res))
    .then((exercise) => exercise ? exercise.view(true) : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Exercise.findById(params.id)
    .then(notFound(res))
    .then((exercise) => exercise ? Object.assign(exercise, body).save() : null)
    .then((exercise) => exercise ? exercise.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Exercise.findById(params.id)
    .then(notFound(res))
    .then((exercise) => exercise ? exercise.remove() : null)
    .then(success(res, 204))
    .catch(next)
