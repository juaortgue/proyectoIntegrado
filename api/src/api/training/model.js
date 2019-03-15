import mongoose, { Schema } from 'mongoose'

const trainingSchema = new Schema({
  name: {
    type: String,
    index: true,
    trim: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  picture: {
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

trainingSchema.methods = {
  /*view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      target: this.target,
      time: this.time,
      picture: this.picture,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }*/
  view (full) {

      let view = {}
      let fields = ['id', 'name', 'target', 'time']
  
      if (full) {
        fields = [...fields, 'description', 'city', 'picture']
      }
  
      fields.forEach((field) => { view[field] = this[field] })
  
      return view
    }
  
  
}

const model = mongoose.model('Training', trainingSchema)

export const schema = model.schema
export default model
