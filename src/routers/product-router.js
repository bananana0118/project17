import { Router } from 'express';
import is from '@sindresorhus/is';

import { productService } from '../services';

const productRouter = Router();

productRouter.post("/product",async(req,res)=>{

  if (is.emptyObject(req.body)) {
    throw new Error(
      'headers의 Content-Type을 application/json으로 설정해주세요'
    );
  }

  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productCategory = req.body.productCategory;
  const productDescription = req.body.productDescription;
  const productSize = req.body.productSize;
  const productManufacturer = req.body.productManufacturer;

  console.log(productName);

  // debug 필요
  const newProduct = await productService.addProduct({
    productName,
    productPrice,
    productCategory,
    productDescription,
    productSize,
    productManufacturer,
  });

  res.status(201).json(newProduct);

})



export { productRouter };
