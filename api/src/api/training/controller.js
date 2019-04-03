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
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'name',
          message: 'category already registered'
        })
      } else {
        next(err)
      }
    })
}

//metodo creado para la edicion de fotos en ejercicio
export const updateWithPhoto = (req, res, next) => {
  
  uploadService.uploadFromBinary(req.file.buffer)
  Training.findById(req.params.id)
  .then(training=>{
    uploadService.uploadFromBinary(req.file.buffer)
    .then(json=>{//seteamos campos junto al a foto subida
      training.picture=json.data.link;
      training.deletehash=json.data.deletehash;
      training.name=req.body.name;
      training.series=req.body.series;
      training.repetitions=req.body.repetitions;
      training.finishTime=req.body.finishTime;
      training.restTime=req.body.restTime;
      training.description=req.body.description;
      training.exercises=req.body.exercises;
      training
        .save()// guardamos el ejercicio
        .then(() => {
          res.jsonp({ training }); // enviamos el ejercicio de vuelta
        })
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).json({
              valid: false,
              param: 'name',
              message: 'category already registered'
            })
          } else {
            next(err)
          }
        });
    })

  }
  )
 
}
//photo methods