import dotenv from "dotenv";

dotenv.config()
import { Like } from './like.js'
import { initDatabase } from '../init.js'

await initDatabase()
const example_like = new Like({
    recipe: '68fe2f0f61c53fb789212c04',
    user: '68fccbffcb3e7a66d7ebf1f4'
})
await example_like.save()

const stored_like = await Like.find()
console.log(stored_like)