import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { create, index, show, update, destroy, createWithPhoto, updateWithPhoto } from './controller'
import { schema } from './model'
export Training, { schema } from './model'
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const router = new Router()
const { name, description, target, time, picture, exercises, level } = schema.tree

/**
 * @api {post} /training Create training
 * @apiName CreateTraining
 * @apiGroup Training
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} name Training's name.
 * @apiParam {String} description Training's description.
 * @apiParam {String} target Training's target.
 * @apiParam {String} time Training's time.
 * @apiParam {String} picture Training's picture.
 * @apiParam {String[]} exercises Training's exercises, like string array.
 * @apiParam {Number} level Training's level.
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
 * @api {post} /training/photo Create training with photo
 * @apiName CreateTrainingPhoto
 * @apiGroup Training
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} name Training's name.
 * @apiParam {String} description Training's description.
 * @apiParam {String} target Training's target.
 * @apiParam {String} time Training's time.
 * @apiParam {File} photo Training's picture, like a file, not a string.
 * @apiParam {String[]}exercises Training's exercises.
 * @apiParam {Number} level Training's level.
 * @apiSuccess {Object} training Training's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Training not found.
 * @apiError 401 admin access only.
 */
router.post('/photo',
  upload.single('photo'),
  createWithPhoto)
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
 * @apiParam {String} name Training's name.
 * @apiParam {String} description Training's description.
 * @apiParam {String} target Training's target.
 * @apiParam {String} time Training's time.
 * @apiParam {String} picture Training's picture.
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
 * @api {put} /training/:id/photo Update training with photo
 * @apiName UpdateTrainingPhoto
 * @apiGroup Training
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} name Training's name.
 * @apiParam {String} description Training's description.
 * @apiParam {String} target Training's target.
 * @apiParam {String} time Training's time.
 * @apiParam {File} photo Training's picture.
 * @apiSuccess {Object} training Training's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Training not found.
 * @apiError 401 admin access only.
 */
router.put('/:id/photo',
  token({ required: true, roles: ['admin'] }),
  upload.single('photo'),
  updateWithPhoto)
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
