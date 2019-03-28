import { success, notFound } from '../../services/response/'
import { Exercise } from '.'
const uploadService = require('../../services/upload/')

export const create = ({ bodymen: { body } }, res, next) =>
  Exercise.create(body)
    .then((exercise) => exercise.view(true))
    .then(success(res, 201))
    .catch(next)

export const createWithPhoto = (req, res, next) => {
  uploadService.uploadFromBinary(req.file.buffer)
      .then((json) => 
        
        Exercise.create({
          name: req.body.name,
          series: req.body.series,
          repetitions: req.body.repetitions,
          finishTime: req.body.finishTime,
          restTime: req.body.restTime,
          gif: json.data.link,
          deletehash: json.data.deletehash,
          categoryId: req.body.categoryId,
          description: req.body.description,
          
        })
      )
      .then((exerciseCreated) => exerciseCreated.view(true))
      .then(success(res, 201))
      .catch(err => {
        console.log(err)
        next(err)
      })
    }

    
export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Exercise.count(query)
    
    .then(count => Exercise.find(query, select, cursor).populate('categoryId', 'name')
      .then((exercises) => ({
        count,
        rows: exercises.map((exercise) => exercise.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Exercise.findById(params.id)
    .populate('categoryId', 'name')
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

//metodo creado para la edicion de fotos en ejercicio
export const updateWithPhoto = (req, res, next) => {
  
  uploadService.uploadFromBinary(req.file.buffer)
  Exercise.findById(req.params.id)
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
      exercise.categoryId=req.body.categoryId;
      exercise
        .save()// guardamos el ejercicio
        .then(() => {
          res.jsonp({ exercise }); // enviamos el ejercicio de vuelta
        });
    })

  }
  )
  
 
}

    



export const destroy = ({ params }, res, next) =>
  Exercise.findById(params.id)
    .then(notFound(res))
    .then((exercise) => exercise ? exercise.remove() : null)
    .then(success(res, 204))
    .catch(next)
