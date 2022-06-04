import { productService, userService } from "../services";

async function cartOrdered(req, res, next) {
    //유저 objectId가져오기
    const userId = req.currentUserId;
    const user = await userService.getUser(userId);

    //prodjct id 가져오기
    const cartData = req.cartData.orderProduct;

    const orderInfo = {
        userId: user._id,
        orderProduct: cartData//orderedProduct,
    };

    req.orderInfo = orderInfo;
    next();
}

export { cartOrdered };
