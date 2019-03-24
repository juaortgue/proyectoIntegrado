import mongoose, { Schema } from 'mongoose'
const uploadService = require('../../services/upload/')

const gymSchema = new Schema({
  name: {
    type: String,
    index: true,
    trim: true,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  zipcode: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  picture: {
    type: String
  },
  deletehash: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

gymSchema.methods = {
  view (full) {

  /*view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      address: this.address,
      province: this.province,
      city: this.city,
      zipcode: this.zipcode,
      position: this.position,
      price: this.price,
      description: this.description,
      picture: this.picture,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view*/
    let view = {}
    let fields = ['id', 'name', 'address', 'price', 'picture', 'position', 'deletehash' ]

    if (full) {
      fields = [...fields, 'province', 'city', 'zipcode',  'description',]
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  }

}
gymSchema.pre('remove', {query: true }, function(next){
  console.log('ELIMINANDO IMAGEN' + this.picture)
  uploadService.deleteImage(this.deletehash)
  return next();
})
gymSchema.pre('save', {query: true }, function(next){
  console.log('ELIMINANDO IMAGEN ' + this.picture)
  uploadService.deleteImage(this.deletehash)
  return next();
})
const model = mongoose.model('Gym', gymSchema)

export const schema = model.schema
export default model
