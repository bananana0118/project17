import mongoose, { model } from "mongoose";
import { userModel, productModel } from "..";
import { OrderSchema } from "../schemas/order-Schema";

const Order = model("orders", OrderSchema); //db에는 orders 변수는 Order로 접근
class OrderModel {
  async create(orderInfo) {
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      userId: orderInfo.ordererId,
      orderProduct: orderInfo.productId,
    });

    order.save(function (err) {
      if (err) return console.log(err);
      else {
        console.log("order가 생성됐습니다.");
      }
    });

    //버튼 클릭시 필욜한 정보
    //사용자의 userId = orderer Id, Products Info

    return order;
  }

  //find 조건찾기 조건을 하나 넣어주기
  async findAll(userId) {
    const orders = await Order.find({ orderderId: userId })
      .populate("orderProduct")
      .exec();
    return orders;
  }

  async findOrderer() {
    const orderer = await Order.find({ orderId: userId }).populate({
      path: "orderer",
    });

    return orderer;
  }

  async addOrder(orderInfo) {
    // const order = await Order.find({}).populate({"orderProduct"});
  }

  async findById(orderId) {
    const order = await Order.findOne({ _id: orderId });
    return order;
  }

  //   async update({ userId, update }) {
  //     const filter = { _id: userId };6293cb0c798cdac70151c319
  //     const option = { returnOriginal: false };

  //     const updatedUser = await User.findOneAndUpdate(filter, update, option);
  //     return updatedUser;
  //   }

  //   async delete(userId) {
  //     const filter = { _id: userId };
  //     const option = { returnOriginal: false };

  //     const deletedUser = await User.findByIdAndDelete(filter, option);

  //     return deletedUser;
  //   }
  // }
}

const orderModel = new OrderModel();

export { orderModel };
