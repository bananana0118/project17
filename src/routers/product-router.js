import { Router } from 'express';

const productRouter = Router();

productRouter.get("/",(req,res)=>{
  res.render("index");
})

productRouter.post('/uploadphoto', async function (req, res, next) {
  res.redirect('/');
});


export { productRouter };
