import express from "express";
import { Server } from "http";
import path from "path";

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움

viewsRouter.use("/", serveStatic("home"));
viewsRouter.use("/profile", serveStatic("profile")); //시급한부분
viewsRouter.use("/register", serveStatic("register"));
viewsRouter.use("/login", serveStatic("login"));
viewsRouter.use("/product", serveStatic("product"));
viewsRouter.use("/profile", serveStatic("profile"));
viewsRouter.use("/cart", serveStatic("cart"));
viewsRouter.use("/shop", serveStatic("shop"));
viewsRouter.use("/goods", serveStatic("goods"));
viewsRouter.use("/admin", serveStatic("admin"));
viewsRouter.use("/productregister", serveStatic("productregister"));
viewsRouter.use("/payment", serveStatic("payment"));
viewsRouter.use("/manageorder", serveStatic("manageorder"));
viewsRouter.use("/findpassword", serveStatic("findpassword"));
viewsRouter.use("/event", serveStatic("event"));
viewsRouter.use("/userorder", serveStatic("userorder"));
viewsRouter.use("/manageproduct", serveStatic("manageproduct"));
viewsRouter.use("/productmodify", serveStatic("productmodify"));

// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use("/", serveStatic("")); //없어지면 navBar 안보임 삭제하지 말것

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
    const resourcePath = path.join(__dirname, `../views/${resource}`);
    const option = { index: `${resource}.html` };

    // express.static 은 express 가 기본으로 제공하는 함수임
    return express.static(resourcePath, option);
}

export { viewsRouter };
