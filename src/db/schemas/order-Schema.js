import mongoose, { Schema, Types } from "mongoose";
import { model } from "mongoose";
import { shortId } from "./types/shortId";
import { UserSchema } from "../schemas/user-schema";
import { stringify } from "nodemon/lib/utils";
//import shortId from "shortid";

const autoIncrement = require("mongoose-auto-increment");
const User = model("users", UserSchema);

autoIncrement.initialize(mongoose);

const OrderSchema = new Schema(
  {
    //주문자Id
    orderNumber: {},
    userId: {
      type: String,
      required: true,
    },
    orderProduct: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    address: {
      type: String,
      required: true,
      default: "test",
    },
    phoneNumber: {
      type: String,
      required: true,
      default: "test",
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 11,
    },
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
  model: "orders",
  field: "orderNumber",
  startAt: 1,
  incrementBy: 1,
});

export { OrderSchema };
