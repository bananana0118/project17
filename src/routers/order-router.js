import { Router } from "express";
import req from "express/lib/request";
import { loginRequired, areYouAdmin } from "../middlewares";
import { orderModel, userModel } from "../db";
import res from "express/lib/response";
import { userService, productService } from "../services";
import { orderService } from "../services/order-service";

const orderRouter = Router();

//만들고 분리하자

//2.주문 가져오기
orderRouter.post("/orderPage", loginRequired, async (req, res, next) => {
  const { address, phoneNumber, totalPrice, no } = req.body;
  const productNo = parseInt(no);
  const userId = req.currentUserId;
  const user = await userService.getUser(userId);
  const orderedProduct = await productService.getProduct(productNo); //프로덕트 데이터 가져오기
  const orderInfo = {
    //주문 정보 가져오기
    address: address,
    phoneNumber: phoneNumber,
    totalPrice: totalPrice,
    productId: orderedProduct._id,
    userId: user._id,
  };

  console.log("orderInfo ", orderInfo);

  const order = await orderModel.create(orderInfo);

  res.status(200).send(order);
});

//test:주문한 상품 정보 받기

//1. 자신의 주문 내역 보기
orderRouter.get("/myOrder", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const no = req.body.no;
    const productNo = parseInt(no);
    const orderedProduct = await productService.getProduct(productNo);
    const user = await userService.getUser(userId);
    const orderInfo = {
      orderProduct: orderedProduct._id,
      userId: user._id,
    };

    const myOrder = await orderModel.findByUserId(orderInfo);

    res.status(200).send(myOrder);
  } catch (error) {
    next(error);
  }
});

//3. 주문 취소
orderRouter.delete(
  "/deleteOrder/:orderNumber",
  loginRequired,
  async (req, res, next) => {
    const orderNumber = req.params.orderNumber;
    const deleteOrder = await orderService.deleteOrder(orderNumber);

    console.log("유저가 삭제 되었습니다");
    res.status(200).json(deleteOrder);
  }
);

//4. 요청을 보내면 배송상태가 수정됨
orderRouter.patch(
  "/updateOrder/:orderNumber",
  loginRequired,
  async (req, res, next) => {
    const orderNumber = req.params.orderNumber;
    const updatedStatus = await orderService.statusUpdate(orderNumber);

    res.status(200).json(updatedStatus);
  }
);
export { orderRouter };
