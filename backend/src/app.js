import express from 'express'
import { userRoutes } from './routes/users.js'
import { recipesRoutes } from './routes/recipe_posts.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import { likeRoutes } from './routes/likes.js'


const app = express()
app.use(cors())
app.use(bodyParser.json())
recipesRoutes(app)
userRoutes(app)
likeRoutes(app)
app.get('/', (req, res) => {
  res.send('Hello from nodemon!')
})
export { app }
