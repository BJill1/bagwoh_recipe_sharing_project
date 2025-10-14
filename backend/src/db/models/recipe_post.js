import mongoose from 'mongoose'

const { Schema } = mongoose

const recipeSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 100,},
    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true }, // e.g., "2 cups"
      },
    ],
    steps: [
      {
        stepNumber: { type: Number, required: true },
        instruction: { type: String, required: true },
      },
    ],
    cookingTime: {
      type: Number, // in minutes
      required: false,
    },
    author: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Create the model
export const Recipe = mongoose.model('Recipe', recipeSchema)
