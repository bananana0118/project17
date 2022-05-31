import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("products", ProductSchema);

export class ProductModel {
<<<<<<< HEAD
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
=======
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

  async findByName() {
    const name = await Product.findOne({ productName: name });
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
>>>>>>> 62d8994caa487708456fa704d0a03d56cccc5f10
}

const productModel = new ProductModel();

export { productModel, Product };
