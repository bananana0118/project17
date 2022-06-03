import { Router } from "express";
import { orderModel, userModel } from "../db";

class ChartService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }

    //며칠부터 며칠까지의 order모델
    //날짜 입력받으면 해당날짜부터 ~날짜까지 볼 수 있도록

    //body로부터 년, 월 , 일 받아야 함.
    //order 모델의 createAt만 사용하면 됨
    async getDateSail(dates) {
        const order = orderModel.findOne({ orderNumber: 115 });
        console.log("type", order);
        console.log(typeof order.createAt);
    }
}
