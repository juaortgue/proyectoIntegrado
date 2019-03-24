import { success, notFound } from '../../services/response/'
import { Training } from '.'
const uploadService = require('../../services/upload/')

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
    .populate('exercises')
    .then(notFound(res))
    .then((training) => training ? training.view(true) : null)
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
//photo methods
export const createWithPhoto = (req, res, next) => {
  uploadService.uploadFromBinary(req.file.buffer)
    .then((json) =>

      Training.create({
        name: req.body.name,
        description: req.body.description,
        target: req.body.target,
        time: req.body.time,
        exercises: req.body.exercises,
        level: req.body.level,
        picture: json.data.link,
        deletehash: json.data.deletehash

      })
    )
    .then((trainingCreated) => trainingCreated.view(true))
    .then(success(res, 201))
    .catch(err => {
      console.log(err)
      next(err)
    })
}

//metodo creado para la edicion de fotos en ejercicio
export const updateWithPhoto = (req, res, next) => {
  
  uploadService.uploadFromBinary(req.file.buffer)
  Training.findById(req.params.id)
  .then(exercise=>{
    uploadService.uploadFromBinary(req.file.buffer)
    .then(json=>{//seteamos campos junto al a foto subida
      exercise.gif=json.data.link;
      exercise.deletehash=json.data.deletehash;
      exercise.name=req.body.name;
      exercise.series=req.body.series;
      exercise.repetitions=req.body.repetitions;
      exercise.finishTime=req.body.finishTime;
      exercise.restTime=req.body.restTime;
      exercise.description=req.body.description;
      exercise
        .save()// guardamos el ejercicio
        .then(() => {
          res.jsonp({ exercise }); // enviamos el ejercicio de vuelta
        });
    })

  }
  )
 
}
//photo methods