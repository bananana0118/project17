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


    async findAndDel(productNo) {
        const product = await Product.findOneAndDelete({
            no: productNo,

        });
        return product;
    }
}

const productModel = new ProductModel();

export { productModel };
