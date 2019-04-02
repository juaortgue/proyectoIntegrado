import { Router } from 'express'
import { middleware as query, Schema } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { create, index, show, update, destroy, createWithPhoto, updateWithPhoto } from './controller'
import { schema } from './model'
export Gym, { schema } from './model'
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const router = new Router()
const { name, address, province, city, zipcode, position, price, description, picture, deletehash} = schema.tree
const gymsSchema = new Schema({
  name: {
    type: String, 
    paths: ['name']
  },
  address: {
    type: String, 
    paths: ['address']
  },
  province: {
    type: String, 
    paths: ['province']
  },
  city: {
    type: String, 
    paths: ['city']
  },
  zipcode: {
    type: String, 
    paths: ['zipcode']
  },
  min_price: {
    type: Number,
    paths: ['price'],
    operator: '$gte'
  },
  max_price: {
    type: Number,
    paths: ['price'],
    operator: '$lte'
  }
  
  
}, )

/**
 * @api {post} /gyms Create gym
 * @apiName CreateGym
 * @apiGroup Gym
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} name Gym's name.
 * @apiParam {String} address Gym's address.
 * @apiParam {String} province Gym's province.
 * @apiParam {String} city Gym's city.
 * @apiParam {String} zipcode Gym's zipcode.
 * @apiParam {String} position Gym's position.
 * @apiParam {Number} price Gym's price.
 * @apiParam {String} picture Gym's picture.
 * @apiParam {String} description Gym's description.
 * @apiSuccess {Object} gym Gym's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Gym not found.
 * @apiError 401 admin access only.
 * @apiError 409 duplicated name.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, address, province, city, zipcode, position, price, description, picture }),
  create)
/**
 * @api {post} /gyms/photo Create gym with photo
 * @apiName CreateGymPhoto
 * @apiGroup Gym
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} name Gym's name.
 * @apiParam {String} address Gym's address.
 * @apiParam {String} province Gym's province.
 * @apiParam {String} city Gym's city.
 * @apiParam {String} zipcode Gym's zipcode.
 * @apiParam {String} position Gym's position.
 * @apiParam {Number} price Gym's price.
 * @apiParam {File} photo Gym's picture.
 * @apiParam {String} description Gym's description.
 * @apiSuccess {Object} gym Gym's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Gym not found.
 * @apiError 401 admin access only.
 * @apiError 409 duplicated name.
 */
router.post('/photo',
  token({ required: true, roles: ['admin'] }),
  upload.single('photo'),
  createWithPhoto)
/**
 * @api {get} /gyms Retrieve gyms
 * @apiName RetrieveGyms
 * @apiGroup Gym
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of gyms.
 * @apiSuccess {Object[]} rows List of gyms.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(gymsSchema),
  index)

/**
 * @api {get} /gyms/:id Retrieve gym
 * @apiName RetrieveGym
 * @apiGroup Gym
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} gym Gym's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Gym not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /gyms/:id Update gym
 * @apiName UpdateGym
 * @apiGroup Gym
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} name Gym's name.
 * @apiParam {String} address Gym's address.
 * @apiParam {String} province Gym's province.
 * @apiParam {String} city Gym's city.
 * @apiParam {String} zipcode Gym's zipcode.
 * @apiParam {String} position Gym's position.
 * @apiParam {Number} price Gym's price.
 * @apiParam {String} description Gym's description.
 * @apiParam {String} picture Gym's picture.
 * @apiSuccess {Object} gym Gym's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Gym not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, address, province, city, zipcode, position, price, description, picture }),
  update)
/**
 * @api {put} /gyms/:id/photo Update gym With photo
 * @apiName UpdateGymPhoto
 * @apiGroup Gym
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} name Gym's name.
 * @apiParam {String} address Gym's address.
 * @apiParam {String} province Gym's province.
 * @apiParam {String} city Gym's city.
 * @apiParam {String} zipcode Gym's zipcode.
 * @apiParam {String} position Gym's position.
 * @apiParam {Number} price Gym's price.
 * @apiParam {String} description Gym's description.
 * @apiParam {File} photo Gym's picture.
 * @apiSuccess {Object} gym Gym's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Gym not found.
 * @apiError 401 admin access only.
 */
router.put('/:id/photo',
  token({ required: true, roles: ['admin'] }),
  upload.single('photo'),
  updateWithPhoto)
/**
 * @api {delete} /gyms/:id Delete gym
 * @apiName DeleteGym
 * @apiGroup Gym
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Gym not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
