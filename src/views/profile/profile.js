// 로그인이 안되어 있을 시 접근할 수 없어야 한다.
// 해당페이지에서 로그아웃 시 다른페이지로 가게끔 해야함.
// 수정하면 요청보내서 DB의 정보가 수정되어야 함.(완료 시 알려주기)
// 수정된 정보로 토큰 다시 저장?

import * as Api from "/api.js";
import { validateEmail } from "/useful-functions.js";

const profileUpdate = document.querySelector("#updateSubmitButton");
const profileDelete = document.querySelector("#profileDeleteButton");
const fullNameInput = document.querySelector("#fullNameInput");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const passwordConfirmInput = document.querySelector("#passwordConfirmInput");
const greeting = document.querySelector(".greetings");
const phoneNumberInput = document.querySelector("#phoneNumber");
// const addressInput = document.querySelector("#address");

// =================================================
//GET: 사용자 정보가져오기
//===================================================

const getAcountInfo = async function () {
    const user = await Api.get("/api/profile/myProfile");
    fullNameInput.value = user.fullName;
    emailInput.value = user.email;
    if (user.phoneNumber) phoneNumberInput.value = user.phoneNumber; // 이야기 해야함. 스키마 설정
    greeting.innerHTML = `${user.fullName}님 환영합니다!`;
};

// ================================================
// PATCH : 사용자 정보 수정 (오류 생길 수 있음)
// ================================================
const updateAccountInfo = async function (e) {
    e.preventDefault();
    const currentPassword = prompt("현재 비밀번호를 입력하세요");
    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;
    const phoneNumber = phoneNumberInput.value;
    // const address = addressInput.value;

    // 잘 입력했는지 확인
    const isFullNameValid = fullName.length >= 2;
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 4;
    const isPasswordSame = password === passwordConfirm;

    if (fullName) {
        if (!isFullNameValid) {
            return alert("이름은 2글자 이상이어야 합니다.");
        }
    }

    if (email) {
        if (!isEmailValid) {
            return alert("이메일 형식이 맞지 않습니다.");
        }
    }

    if (password) {
        if (!isPasswordValid) {
            return alert("비밀번호는 4글자 이상이어야 합니다.");
        }
        if (!isPasswordSame) {
            return alert("비밀번호가 일치하지 않습니다.");
        }
    }

    try {
        const data = {
            fullName,
            email,
            password,
            passwordConfirm,
            phoneNumber,
            currentPassword,
        };
        const userUpdate = await Api.patch("/api/profile/edit", "", data);
        console.log(userUpdate);
        alert("계정 정보가 수정되었습니다.");
    } catch (err) {
        console.error(err.stack);
        alert(`문제 발생: ${err.message}`);
    }
};

// ===================================================
// DELETE:사용자 정보 지우기
// ===================================================

const deleteAccount = async function (e) {
    e.preventDefault();
    const confirm = window.confirm("정말 탈퇴하시나요?");
    if (confirm) {
        const password = prompt("비밀번호를 입력해주세요");
        await Api.delete("/api/profile/quit", "", { password: password });
        alert("회원 탈퇴 완료");
        sessionStorage.removeItem("token");
        location.href = "/";
    }
};
profileDelete.addEventListener("click", deleteAccount);
getAcountInfo();

profileUpdate.addEventListener("click", updateAccountInfo);
