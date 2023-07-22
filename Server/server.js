import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'
import authenticateUser from './middleware/auth.js'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './DB/conn.js';

import AuthRouter from './routes/Authroute.js'
import jobsRouter from './routes/jobsroute.js'


notFoundMiddleware
errorHandlerMiddleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(cors())
app.use(express.json())

app.get('/',(req, res)=>{
    // throw new Error('error')
    res.send("Welcome !")
})

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/jobs', authenticateUser,jobsRouter);

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5000

const start = async () => {
    try {
      await connectDB(process.env.DATABASE);
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`);
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  start();

