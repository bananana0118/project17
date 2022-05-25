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

productRouter.get('/productlist', async function (req, res, next) {
  try {
    console.log("test");
    // 전체 사용자 목록을 얻음
    const products = await productService.getProducts();

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

export { productRouter };
