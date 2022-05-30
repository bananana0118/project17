import { Router } from "express";
import { loginRequired, areYouAdmin } from "../middlewares";
import { orderModel,productModel,userModel } from "../db/models/order-model";


const orderRouter = Router();



//만들고 분리하자

orderRouter.get("/getOrder",loginRequired, (req,res,next)=>{
    //get요청시 populate로 특정항목값을 불러오기
    //req.currentUserId
    //userId로 유저를 검색한 다음
    const orders = orderModel.find({}).populate("user");

    
    console.log(orders);
    res.status(200).render(orders);
});







export { orderRouter };
