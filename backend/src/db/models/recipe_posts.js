import mongoose from 'mongoose'

const { Schema } = mongoose

const recipeSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 100 },
    imageUrl: { type: String },
    ingredients: { type: [String], required: true },
    steps: { type: [String], required: true },
    cookingTime: { type: Number }, // in minutes
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    tags: [{ type: String }],
    likes: { type: Number, default: 0 }, // <-- new field
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
)

export const Recipe = mongoose.model('Recipe', recipeSchema)
