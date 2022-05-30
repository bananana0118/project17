import { Schema } from "mongoose";
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose);

const OrderSchema = new Schema(
  {
    orderNumber: {
      //autuIncrement로 수정
    },
    orderProducts: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "productModel",
    },
    orderer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "userModel",
    }, //주문자
    status: {
      type: String,
      required: false,
      default: "배송 준비 중",
    }, //주문 상태
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

OrderSchema.plugin(autoIncrement.plugin, {
  model: "products",
  field: "no",
  startAt: 1,
  incrementBy: 1,
});

export { OrderSchema };
