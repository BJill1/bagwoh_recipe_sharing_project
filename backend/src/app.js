import express from 'express'
import { userRoutes } from './routes/users.js'
import { recipesRoutes } from './routes/recipe_posts.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import { likeRoutes } from './routes/likes.js'
import { createServer } from 'node:http'
import { Server } from 'socket.io'


const app = express()
app.use(cors())
app.use(bodyParser.json())
recipesRoutes(app)
userRoutes(app)
likeRoutes(app)
app.get('/', (req, res) => {
  res.send('Hello from nodemon!')
})
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})
io.on('connection', (socket) => {
  console.log('user connected:', socket.id)
  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id)
  })
})
export { server as app }

