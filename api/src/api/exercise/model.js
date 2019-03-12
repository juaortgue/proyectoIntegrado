import mongoose, { Schema } from 'mongoose'

const exerciseSchema = new Schema({
  name: {
    type: String
  },
  categoryId: {
    type: String
  },
  series: {
    type: String
  },
  repetitions: {
    type: String
  },
  finishTime: {
    type: String
  },
  restTime: {
    type: String
  },
  gif: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

exerciseSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      categoryId: this.categoryId,
      series: this.series,
      repetitions: this.repetitions,
      finishTime: this.finishTime,
      restTime: this.restTime,
      gif: this.gif,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Exercise', exerciseSchema)

export const schema = model.schema
export default model
