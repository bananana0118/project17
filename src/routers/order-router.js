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

        res.status(200).json(myOrder);
    } catch (error) {
        next(error);
    }
});

orderRouter.get(
    "/myOrder/:email",
    loginRequired,
    areYouAdmin,
    async (req, res, next) => {
        try {
            const email = req.params.email;
            const user = await userService.getUserByEmail(email);
            const orderInfo = {
                userId: user._id,
            };
            const emailOrder = await orderModel.findByUserId(orderInfo);

            res.status(200).json(emailOrder);
        } catch (error) {
            next(error);
        }
    }
);

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

/** @param {orderByDay} */
//orderByDay로 날짜별 데이터 뽑으실 수 있고
//month 는 5 -> 6월이라 하나 뺸 값으로 요청 주셔야 합니다
//timestamps 값은 UTC라 today.toLocaleString()하시면 한국시간으로 나옵니다.

orderRouter.post("/getOrderByday", async (req, res, next) => {
    const { year, month, day } = req.body;
    const dayOrders = await orderModel.getOrderByday({ year, month, day });

    res.status(200).json(dayOrders);
});

export { orderRouter };
