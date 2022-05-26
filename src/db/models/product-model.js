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

    async findByName(productName) {
        const product = await Product.findOne({ _id: productName });
        return product;
    }

    async update({ productName, update }) {
        const filter = { _id: productName };
        const option = { returnOriginal: false };

        const updatedProduct = await Product.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedProduct;
    }

    async findAndDel(productId) {
        const product = await Product.findOneAndDelete({
            productName: productId,
        });
        return product;
    }
}

const productModel = new ProductModel();

export { productModel };
