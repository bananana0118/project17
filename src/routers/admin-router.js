import { Router } from "express";
import { loginRequired, areYouAdmin } from "../middlewares";
const adminRouter = Router();

adminRouter.get("/adminPage", loginRequired, areYouAdmin, async (req, res) => {
    if (!req.isAdmin) {
        console.log("관리자만 접속할 수 있는 페이지입니다.");
    } else {
        console.log("관리자페이지에 접근할 수 있는 권한이 있습니다.");
    }
    res.status(200).json(req.isAdmin);
});

export { adminRouter };
