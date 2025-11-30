import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Order from './models/order.js';

dotenv.config();

const app=express();
const port=3000;

app.use(express.json());

const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB.');
    }catch(error){
        console.error('Database connection error:',error);
    }
}

function transformRequest(body){
  return{
    orderId:body.numeroPedido.replace("-01",""),
    value:body.valorTotal,
    creationDate:new Date(body.dataCriacao),
    items:body.items.map(item=>({
      productId:parseInt(item.idItem),
      quantity:item.quantidadeItem,
      price:item.valorItem
    }))
  };
}

//GETs
app.get('/',(req,res)=>{
  res.send('Welcome to the API server!');
});
app.get('/order/list',async(req,res)=>{
  try{
    const orders=await Order.find();
    res.json(orders);
    }catch(error){
      return res.status(500).json({error:error});
    }
});
app.get('/order/:id',async(req,res)=>{
  const order=await Order.findOne({orderId:req.params.id});
  if (!order) return res.status(404).json({error:"Pedido não encontrado."});
  res.json(order);
});

//POSTs
app.post('/order',async(req,res)=>{
    try{
        const transformedData=transformRequest(req.body);
        const newOrder=await Order.create(transformedData);
        res.json(newOrder);
    }catch(error){
        res.status(500).json({error:error});
    }
});

//PUTs
app.put('/order/:id',async(req,res)=>{
  try{
    const updatedOrder=await Order.findOneAndUpdate(
      {orderId:req.params.id},
      req.body,
      {new:true}
    );
    if (!updatedOrder) return res.status(404).json({error:"Pedido não encontrado."});
    res.json(updatedOrder);
  }catch(error){
    res.status(500).json({error:error});
  }
});

//DELETEs
app.delete('/order/:id',async(req,res)=>{
  try{
        await Order.deleteOne({orderId:req.params.id});
        res.json({message:"Pedido deletado com sucesso"});
    }catch(error){
        res.status(500).json({error:error});
    }
});


connect();
app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});