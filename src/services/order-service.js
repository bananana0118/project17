import { orderModel } from "../db";

//모델에서 오더정보를 가져오는 테이블
<<<<<<< HEAD
class orderService {
  //오더정보 불러오기, 여기서 populate가 수행되야함
}

const orderService = new orderService(orderModel);

export { userSerorderServicevice };
=======
class OrderService {
  //오더정보 불러오기, 여기서 populate가 수행되야함
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  async addOrder(orderInfo) {
    const newOrderInfo = {
      userId: orderInfo.userId,
      orderProduct: orderInfo.productId,
    };
    const newOrder = await orderModel.addOrder(newOrderInfo);

    return newOrder;
  }

  async deleteOrder(orderNumber) {
    return orderModel.delete(orderNumber);
  }

  async statusUpdate(orderNumber) {
    return orderModel.statusUpdate(orderNumber);
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
>>>>>>> 62d8994caa487708456fa704d0a03d56cccc5f10
