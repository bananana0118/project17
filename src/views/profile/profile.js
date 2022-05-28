// 로그인이 안되어 있을 시 접근할 수 없어야 한다.
// 해당페이지에서 로그아웃 시 다른페이지로 가게끔 해야함.
// 수정하면 요청보내서 DB의 정보가 수정되어야 함.(완료 시 알려주기)
// 수정된 정보로 토큰 다시 저장?

import * as Api from "/api.js";

const getMydata = async function () {
  //    // =================================================
  //    //GET: 사용자 정보가져오기
  //    //===================================================
  //     const user = await Api.get("/profile/myProfile");
  //     console.log("유저이름", user.fullName);
  //     console.log("유저이메일", user.email);
  //     console.log("역할", user.role);

  //   //================================================
  //   //PATCH : 사용자 정보 수정 (오류 생길 수 있음)
  //   //================================================

  //     const fullName = fullNameInput.value;
  //     const email = emailInput.value;
  //     const password = passwordInput.value;
  //     const passwordConfirm = passwordConfirmInput.value;

  //   //휴대폰번호
  //   //주소1,2,3
  //   //아래에도 휴대폰번호와 주소를 추가해주세요

  //     const data = { fullName, email, password, passwordConfirm };
  //     const user = await Api.patch("/profile/edit", data);
  //     //에러가 난다면 강예정과 이야기 해 봅시다.
  //     console.log(user);

  //   //===================================================
  //   //DELETE:사용자 정보 지우기
  //   //===================================================

  const deletedUser = await Api.delete("/profile/quit");
  console.log("사용자정보를 삭제합니다.");
};

await getMydata();
