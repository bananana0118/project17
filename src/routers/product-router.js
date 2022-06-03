import { Router } from "express";
import is from "@sindresorhus/is";

import { productService, s3Uploadv2, upload } from "../services";
const productRouter = Router();

// 상품 등록
productRouter.post("/addproduct", upload.array("image"), async (req, res) => {
    // 상품 정보를 formdata로 받아옴
    const productName = req.body.productname;
    const productPrice = parseInt(req.body.productprice);
    const productCategory = parseInt(req.body.category);
    const productDescription = req.body.productdescription;
    const productSize = req.body.productsize;
    const productManufacturer = req.body.productmanufacturer;
    const productImg = [];
    const results = await s3Uploadv2(req.files);

    // 이미지를 S3 서버에 전송
    for (let i = 0; i <= results.length - 1; i++) {
        productImg.push(results[i].Location);
    }

    // 상품 정보를 등록
    const newProduct = await productService.addProduct({
        productName,
        productPrice,
        productSize,
        productDescription,
        productCategory,
        productManufacturer,
        productImg,
    });

    // 상품이 등록 되었으면, 전체 상품 페이지로 돌아감
    res.redirect("/api/product/productlist");
});

// 전체 상품 리스트 JSON 응답
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

// 특정 상품 정보 JSON 응답
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

// 특정 카테고리 상품 정보 JSON 응답
productRouter.get(
    "/get/category/:productCategoryNumber",
    async function (req, res, next) {
        try {
            // 특정 상품 데이터를 얻음
            const productCategoryNo = parseInt(
                req.params.productCategoryNumber
            );
            const products = await productService.getProductByCategory(
                productCategoryNo
            );

            // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }
);

// 상품 정보 수정
productRouter.patch("/patch/:productNo", async function (req, res, next) {
    try {
        // content-type 을 application/json 로 프론트에서
        // 설정 안 하고 요청하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

        // params로부터 productNo를 가져옴
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

// 특정 상품 정보 삭제
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
