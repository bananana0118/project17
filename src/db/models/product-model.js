import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("products", ProductSchema);

export class ProductModel {
    async create(productInfo) {
        const createdNewProduct = await Product.create(productInfo);
        return createdNewProduct;
    }

    async findAll() {
        const products = await Product.find({});
        return products;
    }

<<<<<<< HEAD
    async findByName(productName) {
        const product = await Product.findOne({ _id: productName });
        return product;
    }

    async update({ productName, update }) {
        const filter = { _id: productName };
=======
    async findByNo(productNo) {
        const product = await Product.findOne({ no: productNo });
        return product;
    }

    async update({ productNo, update }) {
        const filter = { no: productNo };
>>>>>>> fb303ef8d3277db5f720f8fb0982fe591b93379e
        const option = { returnOriginal: false };

        const updatedProduct = await Product.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedProduct;
    }

<<<<<<< HEAD
    async findAndDel(productId) {
        const product = await Product.findOneAndDelete({
            productName: productId,
=======
    async findAndDel(productNo) {
        const product = await Product.findOneAndDelete({
            no: productNo,
>>>>>>> fb303ef8d3277db5f720f8fb0982fe591b93379e
        });
        return product;
    }
}

const productModel = new ProductModel();

export { productModel };
