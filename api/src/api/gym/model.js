import mongoose, { Schema } from 'mongoose'

const gymSchema = new Schema({
  name: {
    type: String
  },
  address: {
    type: String
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  zipcode: {
    type: String
  },
  position: {
    type: String
  },
  price: {
    type: String
  },
  description: {
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
