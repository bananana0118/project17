import { Router } from "express";
import is from "@sindresorhus/is";

import { productService } from "../services";
const productRouter = Router();

// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const aws = require("aws-sdk");
// aws.config.loadFromPath(__dirname + "/s3.json");
// let s3 = new aws.S3();

// let upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: "juyong-ccp-2022-v1",
//         acl: "public-read",
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         key: function (req, file, cb) {
//             cb(null, `${Date.now()}_${file.originalname}`);
//         },
//     }),
// });

// const multer = require("multer");

// const upload = multer({
//     dest: "uploads/",
//     limits: { fileSize: 5 * 1024 * 1024 },
// });

// const aws = require("aws-sdk");
// aws.config.loadFromPath(__dirname + "/s3.json");
// const multer = require("multer");
// const multerS3 = require("multer-s3");
// let s3 = new aws.S3();
// let upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: "aws-juyong-elice-image",
//         key: function (req, file, cb) {
//             console.log(file);
//             cb(null, Date.now().toString());
//         },
//         acl: "public-read",
//     }),
// });

// OKAY

const { S3 } = require("aws-sdk");
require("dotenv").config();
const multer = require("multer");
const storage = multer.memoryStorage();

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

const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10000000, files: 3 },
});

productRouter.post("/up", upload.array("image"), async (req, res) => {
    const results = await s3Uploadv2(req.files);
    for (let i = 0; i <= results.length - 1; i++) {
        console.log(results[i].Location);
    }

    res.send("okay");
});

productRouter.post("/addproduct", upload.array("image"), async (req, res) => {
    // if (is.emptyObject(req.body)) {
    //     throw new Error(
    //         "headers의 Content-Type을 application/json으로 설정해주세요"
    //     );
    // }

    const productName = req.body.productname;
    const productPrice = parseInt(req.body.productprice);
    // const productCategory = req.body.category;
    const productDescription = req.body.productdescription;
    const productSize = req.body.productsize;
    const productManufacturer = req.body.productmanufacturer;
    const productImg = [];

    const results = await s3Uploadv2(req.files);
    for (let i = 0; i <= results.length - 1; i++) {
        productImg.push(results[i].Location);
    }
    console.log(results);

    // debug 필요
    const newProduct = await productService.addProduct({
        productName,
        productPrice,
        // productCategory,
        productDescription,
        productSize,
        productManufacturer,
        productImg,
    });

    res.redirect("/api/product/productlist");
});

productRouter.get("/productlist", async function (req, res, next) {
    try {
        // 전체 상품 목록을 얻음
        const products = await productService.getProducts();

        // 상품 목록(배열)을 JSON 형태로 프론트에 보냄
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

productRouter.get("/get/:productNo", async function (req, res, next) {
    try {
        // 특정 상품 데이터를 얻음
        const productNo = req.params.productNo;
        const product = await productService.getProduct(productNo);

        // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

// 상품 정보 수정
// (예를 들어 /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
productRouter.patch("/patch/:productNo", async function (req, res, next) {
    try {
        // content-type 을 application/json 로 프론트에서
        // 설정 안 하고 요청하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

        // params로부터 id를 가져옴
        const productNo = req.params.productNo;

        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const productName = req.body.productName;
        const productPrice = req.body.productPrice;
        const productCategory = req.body.productCategory;
        const productDescription = req.body.productDescription;
        const productSize = req.body.productSize;
        const productManufacturer = req.body.productManufacturer;

        // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
        // 보내주었다면, 업데이트용 객체에 삽입함.
        const toUpdate = {
            ...(productName && { productName }),
            ...(productPrice && { productPrice }),
            ...(productCategory && { productCategory }),
            ...(productDescription && { productDescription }),
            ...(productSize && { productSize }),
            ...(productManufacturer && { productManufacturer }),
        };

        // 상품 정보를 업데이트함.
        const updatedProductInfo = await productService.setProduct(
            productNo,
            toUpdate
        );

        // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
        res.status(200).json(updatedProductInfo);
    } catch (error) {
        next(error);
    }
});

productRouter.delete("/delete/:productNo", async (req, res) => {
    try {
        // content-type 을 application/json 로 프론트에서
        // 설정 안 하고 요청하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }
        const productNo = req.params.productNo;

        const deleteProductInfo = await productService.delProduct(productNo);
        res.status(200).json(deleteProductInfo);
    } catch (error) {
        next(error);
    }
});

export { productRouter };
