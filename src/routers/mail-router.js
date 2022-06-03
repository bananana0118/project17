import { Router } from "express";
import sendMail from "../utils/send-mail";
import asyncHandler from "../utils/async-handler";
import hashPassword from "../utils/hash-password";
import { userModel } from "../db/models/user-model";
import generateRandomPassword from "../utils/generate-random-password";
import bcrypt from "bcrypt";
const mailRouter = Router();

mailRouter.get("/send-message", (req, res) => {
    res.render("mail");
});

mailRouter.post(
    "/send-message",
    asyncHandler(async (req, res) => {
        const { email } = req.body;

        await sendMail(
            email,
            "안녕하세요~ project 17에서 인사드립니다~~~~~~~~~😘",
            "비밀번호는 1234,입니다."
        );

        res.json("메일이 발송되었습니다.");
    })
);

mailRouter.get("/reset-password", (req, res, next) => {
    res.render("/user/reset-password");
});

mailRouter.post(
    "/reset-password",
    asyncHandler(async (req, res) => {
        const { email } = req.body;
        const user = await userModel.findByEmail(email); //** */
        if (!user) {
            return res.status(400).json({
                msg: "이 이메일로 가입된 사용자가 없습니다.",
            });
            //throw new Error("해당 메일로 가입된사용자가 없습니다.");
        }
        //랜덤 패스워드 생성하기!
        const password = generateRandomPassword();

        await userModel.updateByEmail(email, {
            password: await bcrypt.hash(password, 10),
            passwordReset: true,
        });

        await sendMail(
            email,
            "Project17 | 임시 비밀번호가 발급되었습니다",
            `변경된 임시 비밀번호는 ${password}입니다.
        ✔️ 로그인 후 계정관리에서 비밀번호를 꼭 변경해주세요! ✔️`
        );

        res.status(200).json({ msg: "메일발송이 완료되었습니다." });
    })
);

export { mailRouter };
