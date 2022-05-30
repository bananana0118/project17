import { Router } from "express";
import is from "@sindresorhus/is";

import { productService } from "../services";

const productRouter = Router();

productRouter.post("/addproduct", async (req, res) => {
    if (is.emptyObject(req.body)) {
        throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
        );
    }
    console.log('asdf')
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const productCategory = req.body.productCategory;
    const productDescription = req.body.productDescription;
    const productSize = req.body.productSize;
    const productManufacturer = req.body.productManufacturer;
    const productImg = req.body.productImg;

    // debug 필요
    const newProduct = await productService.addProduct({
        productName,
        productPrice,
        productCategory,
        productDescription,
        productSize,
        productManufacturer,
        productImg,
    });

    res.status(201).json(newProduct);
});

productRouter.get("/productlist", async function (req, res, next) {
    try {
        // 전체 사용자 목록을 얻음
        const products = await productService.getProducts();

        // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

// 상품 정보 수정
// (예를 들어 /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
productRouter.patch("/product/:productId", async function (req, res, next) {
    try {
        // content-type 을 application/json 로 프론트에서
        // 설정 안 하고 요청하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

        // params로부터 id를 가져옴
        const productId = req.params.productId;

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
        const updatedProductInfo = await productService.setProduct(toUpdate);

        // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
        res.status(200).json(updatedProductInfo);
    } catch (error) {
        next(error);
    }
});

productRouter.delete("/delete/:id", async (req, res) => {
    try {
        // content-type 을 application/json 로 프론트에서
        // 설정 안 하고 요청하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }
        const productId = req.params.id;

        const deleteProductInfo = await productService.delProduct(productId);
        res.status(200).json(deleteProductInfo);
    } catch (error) {
        next(error);
    }
});

export { productRouter };
