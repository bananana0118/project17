import { Router } from "express";
<<<<<<< HEAD
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






=======
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
>>>>>>> 62d8994caa487708456fa704d0a03d56cccc5f10

export { orderRouter };
