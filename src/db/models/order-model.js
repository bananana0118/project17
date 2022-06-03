import mongoose, { model } from "mongoose";
import { userModel, productModel } from "..";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema); //db에는 orders 변수는 Order로 접근
class OrderModel {
    //order생성
    async create(orderInfo) {
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            address: orderInfo.address,
            phoneNumber: orderInfo.phoneNumber,
            totalPrice: orderInfo.totalPrice,
            orderProduct: orderInfo.orderProduct,
            userId: orderInfo.userId,
        });

        order.save(function (err) {
            if (err) return console.log(err);
            else {
                console.log("order가 생성됐습니다.");
            }
        });

        return order;
    }

    //orderId로 주문 찾기
    async findById(orderId) {
        const order = await Order.findOne({ _id: orderId });
        return order;
    }

    async findByNo(orderNuber) {
        const order = await Order.findOne({ orderNuber });
        return order;
    }

    //user가 시킨 주문 보기
    async findByUserId(orderInfo) {
        const order = await Order.find({ userId: orderInfo.userId })
            .populate("userId")
            .populate("orderProduct");
        return order;
    }

    //주문삭제
    async delete(orderNumber) {
        const deletedOrder = await Order.findOneAndDelete({ orderNumber });
        return deletedOrder;
    }

    async statusUpdate(orderNumber) {
        const order = await Order.findOne({ orderNumber });
        const productStatus = [
            "상품 준비 중",
            "배송 준비 중",
            " 배송 중",
            " 배송완료",
        ];
        for (let i = 0; i < 4; i++) {
            if (order.status === productStatus[i]) {
                order.status = productStatus[i + 1];
                break;
            }
        }

        return order;
    }
    async findAll() {
        const orders = await Order.find({})
            .populate("userId")
            .populate("orderProduct");

        return orders;
    }

    async findDate(dateInfo) {
        const orders = await Order.find({ createAt: { $gt: dateInfo } });

        return dateOrders;
    }

    /** @param {orderByDay} */

    async getOrderByday({ year, month, day }) {
        const orders = await Order.find({
            createdAt: {
                $gte: new Date(year, month, day, 0, 0, 0),
                $lt: new Date(year, month, day, 23, 59, 59),
            },
        });

        return orders;

        // console.log(today.toLocaleString());
    }
}

const orderModel = new OrderModel();

export { orderModel };
