import { userService } from "../services";
import jwt from "jsonwebtoken";

async function passwordResetCheck(req, res, next) {
    const { email, password } = req.body;
    const loginInfo = { email, password };
    const { token } = await userService.getUserToken(loginInfo);

    console.log("tokenTest " + token);
    //토큰 번역하기
    try {
        const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
        const jwtDecoded = jwt.verify(token, secretKey);
        const userId = jwtDecoded.userId;
        const user = await userService.getUser(userId);
        // next();
        const passwordReset = user.passwordReset;
        const data = { token, passwordReset };


        /** @param {passwordReset} */
        if (user.passwordReset) {
            res.status(200).json(data);

            return;
        } else {
            next();
        }
        // console.log(user);
        /** @param {passwordReset} */

        // if (user.passwordReset) {
        //     res.status(200).json(user.passwordReset);
        //     return;
        // } else {
        //     next();
        // }
    } catch (error) {
        res.status(403).json({
            result: "forbidden-approach",
            reason: "정상적인 토큰이 아닙니다.??",
        });

        return;
    }
}
export { passwordResetCheck };
