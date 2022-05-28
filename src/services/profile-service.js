import { userModel } from "../db";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class ProfileService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(userModel) {
    this.userModel = userModel;
  }

  //유저정보를 출력
  async getProfile() {
    const myProfile = await this.userModel.find({});
    return myProfile;
  }

  //우선 이메일로 해둠
  // 유저정보 수정, 현재 비밀번호가 있어야 수정 가능함.
  async setProfile(userInfoRequired, toUpdate) {
    // 객체 destructuring
    const { email, fullName, password, passwordConfirm } = userInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let user = await this.userModel.findByEmail(email);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    // 이제, 정보 수정을 위해 사용자가 입력한 비밀번와 비밀번호 확인이 일치하는지 확인

    if (!(password === passwordConfirm)) {
      throw new Error(
        "현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 이제 드디어 업데이트 시작

    // 비밀번호도 변경하는 경우에는, 회원가입 때처럼 해쉬화 해주어야 함.

    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }

    // 업데이트 진행
    user = await this.userModel.updateByEmail({
      email,
      update: toUpdate,
    });

    return user;
  }

  async deleteUser(userEmail) {
    const email = userEmail;

    // 삭제함
    //앞에서 비밀번호 검사를 했으므로 삭제하곘다는 글자 입력시 삭제

    let user = await userModel.deleteByEmail(email);

    return user;
  }
}

const profileService = new ProfileService(userModel);

export { profileService };
