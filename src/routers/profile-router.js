import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares";
import { userService, productService } from "../services";
import { productModel, userModel } from "../db";

const profileRouter = Router();

//GET: 사용자 정보 가져오기
//loginRequired 를 통해 userId를 받아온 후, user의 정보를 가져옴
profileRouter.get("/myProfile", loginRequired, async function (req, res) {
  const userId = req.currentUserId;
  const user = await userService.getUser(userId);

  res.status(200).json(user);
});

//PATCH : 사용자 정보 변경하기
profileRouter.patch("/edit", loginRequired, async function (req, res, next) {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // params로부터 id를 가져옴
    const userId = req.currentUserId;
    const role = req.role;

    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const fullName = req.body.fullName;
    const password = req.body.password;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    console.log(role);

    // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
    const currentPassword = req.body.currentPassword;


    // currentPassword 없을 시, 진행 불가
    if (!currentPassword) {
      throw new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
    }

    const userInfoRequired = { userId, currentPassword };

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(fullName && { fullName }),
      ...(password && { password }),
      ...(address && { address }),
      ...(phoneNumber && { phoneNumber }),
      ...(role && { role }),
    };

    // 사용자 정보를 업데이트함.

    // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
    const updatedUser = await userService.setUser(userInfoRequired, toUpdate);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});
//DELETE : 탈퇴하기
profileRouter.delete("/quit", loginRequired, async function (req, res) {
  try {
    const pass = req.body.password;
    const userId = req.currentUserId;
    const deletedUser = await userService.deleteUser(userId);
    console.log(deletedUser);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.log("탈퇴하기 백엔드에서 에러가 났습니다.");
    next(error);
  }
});

export { profileRouter };
