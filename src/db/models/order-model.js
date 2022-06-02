import mongoose, { model } from "mongoose";
import { userModel, productModel } from "..";
import { OrderSchema } from "../schemas/order-Schema";

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
                console.log(order);
            }
        });

        return order;
    }

    //orderId로 주문 찾기
    async findById(orderId) {
        const order = await Order.findOne({ _id: orderId });
        return order;
    }

    //user가 시킨 주문 보기
    async findByUserId(orderInfo) {
        const order = await Order.findOne({ userId: orderInfo.userId })
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
            console.log(order.status);
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

    //   async update({ userId, update }) {
    //     const filter = { _id: userId };6293cb0c798cdac70151c319
    //     const option = { returnOriginal: false };

    //     const updatedUser = await User.findOneAndUpdate(filter, update, option);
    //     return updatedUser;
    //   }
}

const orderModel = new OrderModel();

export { orderModel };
