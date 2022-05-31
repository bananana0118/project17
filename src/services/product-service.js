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

    // 상품 상세 정보 확인
    async getProduct(productNo) {
        const product = await this.productModel.findByNo(productNo);
        return product;
    }

    // 상품정보 수정
    async setProduct(productNo, toUpdate) {
        // 우선 해당 상품 이름이 db에 있는지 확인
        const product = await this.productModel.findByNo(productNo);

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!product) {
            throw new Error("상품 내역이 없습니다. 다시 한 번 확인해 주세요.");
        }

        // 업데이트 진행
        product = await this.productModel.update({
            productNo,
            update: toUpdate,
        });

        return product;
    }

    // 상품 삭제
    async delProduct(productNo) {
        const products = await this.productModel.findAndDel(productNo);
        return products;
    }
}

const productService = new ProductService(productModel);

export { productService };
