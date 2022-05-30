import { model } from "mongoose";
import { OrderSchema } from "../schemas/category-schema";

const Order = model("orders", OrderSchema); //db에는 orders 변수는 Order로 접근

const orderModel = new OrderModel();

export { orderModel };
