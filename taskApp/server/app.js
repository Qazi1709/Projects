import express from 'express'
import userRoutes from './controllers/users/index.js'
import taskRoutes from './controllers/task/index.js'
const app = express()
const port = 6004;
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Server is running up !')
})

app.use('/api/user/', userRoutes)
app.use('/api/task/', taskRoutes)

app.listen(port,()=>{
    console.info('Server started at port ', port);

})