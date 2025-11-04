import mongoose from 'mongoose'

const { Schema } = mongoose

const likeSchema = new Schema ({
    recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    required: true
    },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
},
   { timestamps: true }
)

const Like = mongoose.model('like', likeSchema)

export default Like
