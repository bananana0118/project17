import { orderModel } from "../db";

//모델에서 오더정보를 가져오는 테이블

class OrderService {
  //오더정보 불러오기, 여기서 populate가 수행되야함
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  async addOrder(orderInfo) {
    const newOrder = await orderModel.create(orderInfo);
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
