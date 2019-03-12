import mongoose, { Schema } from 'mongoose'

const trainingSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  target: {
    type: String
  },
  time: {
    type: String
  },
  picture: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

trainingSchema.methods = {
  view (full) {
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
  }
}

const model = mongoose.model('Training', trainingSchema)

export const schema = model.schema
export default model
