import express from 'express'
import { recipesRoutes } from './routes/recipe_posts.js'
import cors from 'cors'
import bodyParser from 'body-parser'
const app = express()
app.use(cors())
app.use(bodyParser.json())
recipesRoutes(app)
app.get('/', (req, res) => {
  res.send('Hello from nodemon!')
})
export { app }
