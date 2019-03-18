import mongoose, { Schema } from 'mongoose'

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
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

exerciseSchema.methods = {
  /*view (full) {
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
  }*/
  view (full) {

      let view = {}
      let fields = ['id', 'name', 'series', 'repetitions', 'categoryId']
  
      if (full) {
        fields = [...fields, 'finishTime', 'restTime','gif', 'description']
      }
  
      fields.forEach((field) => { view[field] = this[field] })
  
      return view
    }
}

const model = mongoose.model('Exercise', exerciseSchema)

export const schema = model.schema
export default model
