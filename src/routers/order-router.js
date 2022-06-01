import { Router } from "express";
import req from "express/lib/request";
import { loginRequired, areYouAdmin, cartOrdered } from "../middlewares";
import { orderModel, userModel } from "../db";
import res from "express/lib/response";
import { userService, productService } from "../services";
import { orderService } from "../services/order-service";

const orderRouter = Router();

//만들고 분리하자

//1. 전체 주문 내역 보기
orderRouter.get(
    "/getAllOrder",
    loginRequired,
    areYouAdmin,
    async (req, res, next) => {
        const orders = await orderModel.findAll();
        res.status(200).json(orders);
    }
);

//2. 결제 시 주문 생성하기
// orderRouter.post("/orderPage", loginRequired, async (req, res, next) => {
//     const { address, phoneNumber, totalPrice, no } = req.body;
//     const productNo = parseInt(no);
//     const userId = req.currentUserId;
//     const user = await userService.getUser(userId);
//     const orderedProduct = await productService.getProduct(productNo); //프로덕트 데이터 가져오기
//     const orderInfo = {
//         //주문 정보 가져오기
//         address: address,
//         phoneNumber: phoneNumber,
//         totalPrice: totalPrice,
//         productId: orderedProduct._id,
//         userId: user._id,
//     };

//     console.log("orderInfo ", orderInfo);

//     const order = await orderModel.create(orderInfo);

//     res.status(200).send(order);
// });

//3. 결제 시 주문 생성하기
orderRouter.post(
    "/cart",
    loginRequired,
    cartOrdered,
    async (req, res, next) => {
        const { address, phoneNumber, totalPrice } = req.body;
        const orderInfo = req.orderInfo;

        orderInfo.address = address;
        orderInfo.phoneNumber = phoneNumber;
        orderInfo.totalPrice = totalPrice;

        console.log(orderInfo);
        const myOrder = await orderModel.create(orderInfo);

        res.status(200).json(myOrder);
    }
);

//4.
orderRouter.get("/myOrder", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const user = await userService.getUser(userId);
        const orderInfo = {
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
