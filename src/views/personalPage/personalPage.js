// 로그인이 안되어 있을 시 접근할 수 없어야 한다.
// 해당페이지에서 로그아웃 시 다른페이지로 가게끔 해야함.
// 수정하면 요청보내서 DB의 정보가 수정되어야 함.(완료 시 알려주기)
// 수정된 정보로 토큰 다시 저장?

import * as Api from "/api.js";
import { validateEmail } from "/useful-functions.js";

const profileUpdate = document.querySelector("#submitButton");
const profileDelete = document.querySelector("#profileDeleteButton");

async function updateAccount(e) {
    e.preventDefault();

    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    // 잘 입력했는지 확인
    const isFullNameValid = fullName.length >= 2;
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 4;
    const isPasswordSame = password === passwordConfirm;

    if (!isFullNameValid || !isPasswordValid) {
        return alert("이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.");
    }

    if (!isEmailValid) {
        return alert("이메일 형식이 맞지 않습니다.");
    }

    if (!isPasswordSame) {
        return alert("비밀번호가 일치하지 않습니다.");
    }

    // 유저정보 수정 요청
    try {
        const data = { fullName, email, password };
        // 주소, 전화번호 등 정보 추가 시 추가할 것
        const userId = data.email;
        await Api.patch("/api/users", userId, data);
        console.log(data);
        alert(`정상적으로 수정되었습니다.`);
        history.back();
    } catch (err) {
        console.error(err.stack);
        alert(`문제 발생: ${err.message}`);
    }
}

profileUpdate.addEventListener("click", updateAccount);
profileDelete.addEventListener("click", deleteAccount);
