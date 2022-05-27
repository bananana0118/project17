import { Schema, Types } from "mongoose";

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
        required: true,
    },
    productManufacturer: {
        type: String,
        required: true,
    },
    productImg: {
        type: String,
        required: false,
    },
});

export { ProductSchema };
