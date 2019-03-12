import mongoose, { Schema } from 'mongoose'

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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Gym', gymSchema)

export const schema = model.schema
export default model
