import { Router } from 'express';

const productRouter = Router();

productRouter.get('/', async function (req, res, next) {
  try {
    const users = 15;
    console.log(15);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});


export { productRouter };
