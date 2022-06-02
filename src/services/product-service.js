import { productModel } from "../db";
import { S3 } from "aws-sdk";
import multer from "multer";
require("dotenv").config();

// 이미지 업로드 서버 설정
const storage = multer.memoryStorage();

// 이미지 업로드 서버 통신 환경 변수 및 메타데이터 설정
const s3Uploadv2 = async (files) => {
    const s3 = new S3();

    const params = files.map((file) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `uploads/${file.originalname}`,
            Body: file.buffer,
            ContentType: "image/png",
        };
    });

    return await Promise.all(params.map((param) => s3.upload(param).promise()));
};

// 이미지 업로드 파일 필터 설정
const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
};

// 이미지 업로드용 multer 설정 (사이즈, 최대 갯수)
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10000000, files: 3 },
});

// 상품 관련 메소드 class
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

    // 카테고리 상품 보기
    async getProductByCategory(productCategory) {
        const products = await this.productModel.findByCategory(
            productCategory
        );
        return products;
    }

    // 상품 삭제
    async delProduct(productNo) {
        const products = await this.productModel.findAndDel(productNo);

        return products;
    }

    // 상품 ID로 상품 정보 확인
    async getProductById(productId) {
        const product = await this.productModel.findById(productId);
        return product;
    }
}

const productService = new ProductService(productModel);

export { productService, s3Uploadv2, upload };
