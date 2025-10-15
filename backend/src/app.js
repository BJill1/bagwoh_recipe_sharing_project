import express from 'express'
import { recipesRoutes } from './routes/recipe_posts.js'
import bodyParser from 'body-parser'
const app = express()
app.use(bodyParser.json())
recipesRoutes(app)
app.get('/', (req, res) => {
  res.send('Hello from nodemon!')
})
export { app }
