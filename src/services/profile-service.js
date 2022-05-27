import { UserModel } from "../db";

import { profileService, userService } from "../services";
class ProfileService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  //유저정보를 출력
  async getProfile() {
    const myProfile = await this.UserModel.find({});
    return myProfile;
  }

  //   async deleteUser(userInfo) {
  //     const { userEmail, password } = userInfo;

  //     //user비밀번호가 일치하나 검증하고
  //     // 삭제함
  //     //문제가 있을경우 비밀번호가 다릅니다 라는 말 리턴
  //     let user = await this.UserModel.findById(userEmail);
  //   }
}

const profileService = new ProfileService(UserModel);

export { profileService };
