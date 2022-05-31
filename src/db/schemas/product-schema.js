import mongoose, { Schema, Types } from "mongoose";
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose);

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: String,
        required: true,
    },
    productSize: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: false,
    },
    productCategory: {
        type: Number,
        required: false,
    },
    productManufacturer: {
        type: String,
        required: true,
    },
    productImg: {
        type: [String],
        required: false,
    },
    no: Number,
});

ProductSchema.plugin(autoIncrement.plugin, {
    model: "products",
    field: "no",
    startAt: 1,
    incrementBy: 1,
});

export { ProductSchema };
