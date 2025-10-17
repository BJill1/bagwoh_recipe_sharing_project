import mongoose from 'mongoose'

const { Schema } = mongoose

const recipeSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 100,},
    ingredients: {
        type: [String], required: true 
      },
    steps:{
        type: [String], required: true
      },
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
