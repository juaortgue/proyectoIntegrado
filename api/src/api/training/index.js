import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Training, { schema } from './model'

const router = new Router()
const { name, description, target, time, picture, exercises, level } = schema.tree

/**
 * @api {post} /training Create training
 * @apiName CreateTraining
 * @apiGroup Training
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Training's name.
 * @apiParam description Training's description.
 * @apiParam target Training's target.
 * @apiParam time Training's time.
 * @apiParam picture Training's picture.
 * @apiSuccess {Object} training Training's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Training not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, description, target, time, picture, exercises, level }),
  create)

/**
 * @api {get} /training Retrieve trainings
 * @apiName RetrieveTrainings
 * @apiGroup Training
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of trainings.
 * @apiSuccess {Object[]} rows List of trainings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */

 /*nombrecito2*/
router.get('/',
  master(),
  query({
    level: {
     type: Number,
     paths: ['level'],
     operator: '$eq'
   },
   name: {
    type: String,
    paths: ['name']
  },
  target: {
    type: String,
    paths: ['target']
  }
 }),
  index)

  /*const schema = new Schema({
  active: Boolean, // shorthand to { type: Boolean }
  sort: '-createdAt', // shorthand to { type: String, default: '-createdAt' }
  term: {
    type: RegExp,
    paths: ['title', 'description'],
    bindTo: 'search' // default was 'query'
  },
  with_picture: {
    type: Boolean,
    paths: ['picture'],
    operator: '$exists'
  }
}, {
  page: false, // disable default parameter `page`
  limit: 'max_items' // change name of default parameter `limit` to `max_items`
}); */

/**
 * @api {get} /training/:id Retrieve training
 * @apiName RetrieveTraining
 * @apiGroup Training
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} training Training's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Training not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /training/:id Update training
 * @apiName UpdateTraining
 * @apiGroup Training
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Training's name.
 * @apiParam description Training's description.
 * @apiParam target Training's target.
 * @apiParam time Training's time.
 * @apiParam picture Training's picture.
 * @apiSuccess {Object} training Training's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Training not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, description, target, time, picture, exercises, level }),
  update)

/**
 * @api {delete} /training/:id Delete training
 * @apiName DeleteTraining
 * @apiGroup Training
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Training not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
