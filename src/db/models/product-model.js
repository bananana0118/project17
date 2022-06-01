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

    async findByNo(productNo) {
        const product = await Product.findOne({ no: productNo });
        return product;
    }

    async findByCategory(productCategory) {
        const products = await Product.find({
            productCategory: productCategory,
        });
        return products;
    }

    async findByName() {
        const product = await Product.findOne({ productName: name });
        return product;
    }

    async findById(productId) {
        const product = await Product.findOne({ _id: productId });
        return product;
    }

    async update({ productNo, update }) {
        const filter = { no: productNo };
        const option = { returnOriginal: false };

        const updatedProduct = await Product.findOneAndUpdate({
            filter,
            update,
            option
        });
        return updatedProduct;
    }

    async findAndDel(productNo) {
        const product = await Product.findOneAndDelete({
        no: productNo,
        });
        return product;
    }
}

const productModel = new ProductModel();

export { productModel, Product };
