import mongoose, { Schema } from 'mongoose'
const uploadService = require('../../services/upload/')

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  series: {
    type: Number,
    required: true
  },
  repetitions: {
    type: Number,
    required: true
  },
  finishTime: {
    type: String,
    required: true
  },
  restTime: {
    type: String,
    required: true
  },
  gif: {
    type: String,
    required: true
  },
  deletehash: {
    type: String
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})
exerciseSchema.pre('remove', {query: true }, function(next){
  console.log('Elminando la imagen' + this.gif)
  uploadService.deleteImage(this.deletehash)
  return next();
})

exerciseSchema.methods = {
  
  view (full) {

      let view = {}
      let fields = ['id', 'name', 'series', 'repetitions', 'categoryId', 'gif', 'deletehash']
  
      if (full) {
        fields = [...fields, 'finishTime', 'restTime',  'description']
      }
  
      fields.forEach((field) => { view[field] = this[field] })
  
      return view
    }
}

const model = mongoose.model('Exercise', exerciseSchema)

export const schema = model.schema
export default model
