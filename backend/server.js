import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import data from './data';
import userRouter from './routers/userRouter';

mongoose.connect(config.MONGODB_URL,{
  useNewUrlParser :true,
  useUnifiedTopology:true,
  useCreateIndex: true,
}).then(()=>{
  console.log('Connected to mongodb')
})
.catch((error)=>{
  console.log(error.reason);
})
const app = express();
app.use(cors());
app.use('/api/users',userRouter)
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.get('/api/products/:id', (req, res)=> {
  const product =data.products.find(x=>x._id===req.params.id)
  if(product){
    res.send(product);
  } else {
    res.status(404).send({message:'Product not found'});
  }
})

app.listen(5000, () => {
  console.log('serve at http://localhost:5000');
});
