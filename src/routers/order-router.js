import { Router } from "express";
import req from "express/lib/request";
import { loginRequired, areYouAdmin } from "../middlewares";
import { orderModel, userModel } from "../db";
import res from "express/lib/response";
import { userService, productService } from "../services";
import { orderService } from "../services/order-service";

const orderRouter = Router();

//만들고 분리하자

orderRouter.get("/orderPage", loginRequired, async (req, res, next) => {
  console.log("orderInfo ", orderInfo);



  const order = await orderModel.create(orderInfo);

  res.status(200).send(order);
});

//test:주문한 상품 정보 받기

//1. 주문 내역 보기
orderRouter.post("/orderPage", loginRequired, async (req, res, next) => {
  const userId = req.currentUserId;
  const { productNo } = req.body;
  const orderedProduct = await productService.getProduct(productNo);
  const orderInfo = {
    productId: orderedProduct._id,
    ordererId: userId,
  };

  const findOrder = await orderModel.findAll(userId);

  res.status(200).send(findOrder);
});
//2. 주문 취소

//3. 주문 수정하기??

export { orderRouter };
