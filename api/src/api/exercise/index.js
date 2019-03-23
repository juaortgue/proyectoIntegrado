import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { create, index, show, update, destroy, createWithPhoto } from './controller'
import { schema } from './model'
export Exercise, { schema } from './model'
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const router = new Router()
const { name, categoryId, series, repetitions, finishTime, restTime, gif, description, deletehash } = schema.tree

/**
 * @api {post} /exercises Create exercise
 * @apiName CreateExercise
 * @apiGroup Exercise
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Exercise's name.
 * @apiParam categoryId Exercise's categoryId.
 * @apiParam series Exercise's series.
 * @apiParam repetitions Exercise's repetitions.
 * @apiParam finishTime Exercise's finishTime.
 * @apiParam restTime Exercise's restTime.
 * @apiParam gif Exercise's gif.
 * @apiSuccess {Object} exercise Exercise's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Exercise not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, categoryId, series, repetitions, finishTime, restTime, gif, description }),
  create)

router.post('/photo',
  token({ required: true, roles: ['admin'] }),
//body({foto, nombre, codReferencia, descripcion, dimensiones }),
  //body({ name, categoryId, series, repetitions, finishTime, restTime,  description }),
  upload.single('photo'),
  createWithPhoto)
/**
 * @api {get} /exercises Retrieve exercises
 * @apiName RetrieveExercises
 * @apiGroup Exercise
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of exercises.
 * @apiSuccess {Object[]} rows List of exercises.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /exercises/:id Retrieve exercise
 * @apiName RetrieveExercise
 * @apiGroup Exercise
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} exercise Exercise's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Exercise not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /exercises/:id Update exercise
 * @apiName UpdateExercise
 * @apiGroup Exercise
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Exercise's name.
 * @apiParam categoryId Exercise's categoryId.
 * @apiParam series Exercise's series.
 * @apiParam repetitions Exercise's repetitions.
 * @apiParam finishTime Exercise's finishTime.
 * @apiParam restTime Exercise's restTime.
 * @apiParam gif Exercise's gif.
 * @apiSuccess {Object} exercise Exercise's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Exercise not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, categoryId, series, repetitions, finishTime, restTime, gif, description }),
  update)

/**
 * @api {delete} /exercises/:id Delete exercise
 * @apiName DeleteExercise
 * @apiGroup Exercise
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Exercise not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
