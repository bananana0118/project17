import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("products", ProductSchema);

export class ProductModel {
    async create(productInfo) {
        const createdNewProduct = await Product.create(productInfo);
        return createdNewProduct;
    }

    async findAll() {
        const products = await Product.find({}).sort({ no: -1 });
        return products;
    }

    /**@override @param {findAll}  */
    async findAll(num) {
        const products = await Product.find({}).sort({ no: -1 }).limit(num);
        return products;
    }

    async findByNo(productNo) {
        const product = await Product.findOne({ no: productNo });
        return product;
    }

    async findByName() {
        const name = await Product.findOne({ productName: name });
        return product;
    }

    async findById(productId) {
        const product = await Product.findOne({ _id: productId });
        return product;
    }

    async update({ productNo, update }) {
        const filter = { no: productNo };
        const option = { returnOriginal: false };

        const updatedProduct = await Product.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedProduct;
    }

    async findByCategory(productCategory) {
        const products = await Product.find({
            productCategory: productCategory,
        }).sort({ no: -1 });
        return products;
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
