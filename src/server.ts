import express  from 'express'
import morgan from 'morgan'
import cors from 'cors'
const app = express()
const port =  process.env.PORT || 3000 

app.use(cors())
app.use(morgan('combined'))

app.get('/api', (req, res) => {
  res.send('Welcome to :^) Recipify API')
})


app.listen(port, () => {
  console.log(`Server running in ${port}`)
})