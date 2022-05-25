import { productModel } from "../db";

class ProductService {
    // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
    constructor(productModel) {
        this.productModel = productModel;
    }

    // 상품 추가
    async addProduct(productInfo) {
        // db에 저장
        const createdNewProduct = await this.productModel.create(productInfo);

        return createdNewProduct;
    }

    // 상품 목록을 받음.
    async getProducts() {
        const products = await this.productModel.findAll();
        return products;
    }
}

const productService = new ProductService(productModel);

export { productService };