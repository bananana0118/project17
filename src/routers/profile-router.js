import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired, adminRequired } from "../middlewares";
import { userService, productService } from "../services";
import { productModel, userModel } from "../db";
import { profileService } from "../services/profile-service";

const profileRouter = Router();

//사용자 정보 가져오기
//이메일에 맞는유저정보를 불러와서 반환함
profileRouter.get("", loginRequired, async (req, res) => {
    // 알아서 토큰을 일어서 유저정보를 뽑아서 줘야함.
    //
    const userEmail = req.params.email;
    const user = await userService.getUser(userEmail);
    //mobileNumber, address

    const { fullName, email, password } = user;
    console.log(fullName);
    const userProfile = {
        fullName,
        email,
        password,
        // mobileNumber,
        // address,
    };

    res.send(userProfile);
    console.log(`${email} 유저정보를 전송했습니다.`);
});

//사용자 정보 수정
profileRouter.patch("/:email", async function (req, res, next) {
    try {
        // content-type 을 application/json 로 프론트에서
        // 설정 안 하고 요청하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

        // params로부터 id를 가져옴
        const email = req.params.email;

        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const fullName = req.body.fullName; //이름
        const password = req.body.password; //비밀번호
        // const address = req.body.address; //주소
        // const phoneNumber = req.body.phoneNumber; //핸드폰번호

        // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
        const passwordConfirm = req.body.passwordConfirm;
        //currentPassword 는 확인용 변경

        // currentPassword 없을 시, 진행 불가
        if (password !== passwordConfirm) {
            throw new Error("비밀번호 확인이 일치하지 않습니다.");
        }

        const userInfoRequired = { email, fullName, password, passwordConfirm };

        // const userInfoRequired = { email, currentPassword };

        // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
        // 보내주었다면, 업데이트용 객체에 삽입함.

        //이름과 비밀번호 변경
        const toUpdate = {
            ...(fullName && { fullName }),
            ...(password && { password }),
            // ...(address && { address }),
            // ...(phoneNumber && { phoneNumber }),
        };

        // 사용자 정보를 업데이트함.
        const updatedUserInfo = await profileService.setProfile(
            userInfoRequired,
            toUpdate
        );

        // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
        res.status(200).send(updatedUserInfo);
    } catch (error) {
        next(error);
    }
});

profileRouter.delete("/:email", async (req, res) => {
    try {
        // content-type 을 application/json 로 프론트에서
        // 설정 안 하고 요청하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }
        const userEmail = req.params.email;
        const password = req.body.password;

        userService.delete({ userEmail, password });

        res.status(200).json(deleteProductInfo);
    } catch (error) {
        next(error);
    }
});

export { profileRouter };
