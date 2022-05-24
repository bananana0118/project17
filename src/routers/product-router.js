import { Router } from 'express';

const productRouter = Router();

productRouter.post("/product",(req,res)=>{
  console.log("test");
})



export { productRouter };
