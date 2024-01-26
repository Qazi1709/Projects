import express from 'express';
import './dbconnect.js'
import userRoutes from './controllers/users/index.js';
import taskCRUDRoutes from './controllers/tasks/index.js';
import authRoute from './controllers/auth/token.js'

const app = express();
const port = 5003;

app.use(express.json());

app.get('/',(req,res)=>{
    res.send(`Express server is up and running`)
})

app.use('/api/user',userRoutes);
app.use('/api/user',taskCRUDRoutes);
app.use('/api/auth',authRoute);

  


app.listen(port,()=>{
    console.info(`server is running on port :`, port)
})