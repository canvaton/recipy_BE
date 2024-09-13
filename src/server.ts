import express  from 'express'
import morgan from 'morgan'
import cors from 'cors'
import userRouter from './routes/userRouter'
import recipeRouter from './routes/recipeRouter'

const app = express()
const port =  process.env.PORT || 3000 


app.use(cors())
app.use(express.json());
app.use(morgan('combined'))


app.get('/api', (req, res) => {
  res.send('Welcome to :^) Recipify API')
})


// ! Auth Middleware here
app.use('/api/user',userRouter)
app.use('api/recipe', recipeRouter)

app.listen(port, () => {
  console.log(`Server running in ${port}`)
})