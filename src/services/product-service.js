import { productModel } from '../db';


class ProductService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(productModel) {
    this.productModel = productModel;
  }

  // 회원가입
  async addProduct(productInfo) {

    // db에 저장
    const createdNewProduct = await this.productModel.create(productInfo);

    return createdNewProduct;
  }
}

const productService = new ProductService(productModel);

export { productService };
