// 로그인이 안되어 있을 시 접근할 수 없어야 한다.
// 해당페이지에서 로그아웃 시 다른페이지로 가게끔 해야함.
// 수정하면 요청보내서 DB의 정보가 수정되어야 함.(완료 시 알려주기)
// 수정된 정보로 토큰 다시 저장?

import { createMyOrderItem } from "../common.js";
import * as Api from "/api.js";
import { validateEmail } from "/useful-functions.js";

const profileUpdate = document.querySelector("#updateSubmitButton");
const profileDelete = document.querySelector("#profileDeleteButton");
const fullNameInput = document.querySelector("#fullNameInput");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const passwordConfirmInput = document.querySelector("#passwordConfirmInput");
const greeting = document.querySelector(".greetings-name");
const phoneNumberInput = document.querySelector("#phoneNumber");
const zipcodeInput = document.querySelector("#zipcode");
const address1Input = document.querySelector("#input-address1");
const address2Input = document.querySelector("#input-address2");
const orderContainer = document.querySelector(".myOrderContainer");
const profileUpdateContainer = document.querySelector(
    ".profileUpdate-form-container"
);
const orderListBtn = document.querySelector("#orderListBtn");
const userInfoBtn = document.querySelector("#userInfoBtn");

// =================================================
//GET: 사용자 정보가져오기
//===================================================

const getAcountInfo = async function () {
    const user = await Api.get("/api/profile/myProfile");
    fullNameInput.value = user.fullName;
    emailInput.value = user.email;
    if (user.phoneNumber) phoneNumberInput.value = user.phoneNumber;
    if (user.address) {
        zipcodeInput.value = user.address.postalCode;
        address1Input.value = user.address.address1;
        address2Input.value = user.address.address2;
    }
    greeting.innerHTML = `${user.fullName}`;
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
    const postalCode = zipcodeInput.value;
    const address1 = address1Input.value;
    const address2 = address2Input.value;
    const address = { postalCode, address1, address2 };

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
            address,
            currentPassword,
        };
        const userUpdate = await Api.patch("/api/profile/edit", "", data);
        console.log(userUpdate);
        alert("계정 정보가 수정되었습니다.");
    } catch (err) {
        console.error(err.stack);
        alert(`${err.message}`);
    }
};

// ===================================================
// DELETE:사용자 정보 지우기
// ===================================================

const deleteAccount = async function (e) {
    e.preventDefault();
    const confirm = window.confirm("정말 탈퇴하시나요?");
    if (confirm) {
        try {
            const password = prompt("비밀번호를 입력해주세요");
            await Api.delete("/api/profile/quit", "", { password: password });
            alert("회원 탈퇴 완료");
            sessionStorage.removeItem("token");
            location.href = "/";
        } catch (err) {
            console.log(err.stack);
            alert(`${err.message}`);
        }
    }
};
profileDelete.addEventListener("click", deleteAccount);
// getAcountInfo();

profileUpdate.addEventListener("click", updateAccountInfo);

const loadOrder = async () => {
    const myOrderBox = document.querySelector(".myOrderBox");
    while (myOrderBox.hasChildNodes()) {
        myOrderBox.removeChild(myOrderBox.firstChild);
    }
    orderListBtn.disabled = true;
    userInfoBtn.disabled = false;
    orderContainer.style.display = "flex";
    profileUpdateContainer.style.display = "none";
    const myOrders = await Api.get("/api/order/myOrder");
    myOrders.map((myOrder) => {
        const div = createMyOrderItem(myOrder);
        myOrderBox.appendChild(div);
    });
};

const loadUserInfo = () => {
    orderListBtn.disabled = false;
    userInfoBtn.disabled = true;
    orderContainer.style.display = "none";
    profileUpdateContainer.style.display = "flex";
    getAcountInfo();
};

// 임시 비밀번호를 발급받아 로그인 한 유저는 정보수정 페이지로 이동하기 위해 밑 코드 추가
const passwordResetLoadPage = async () => {
    const user = await Api.get("/api/profile/myProfile");
    const isPasswordReset = user.passwordReset;
    if (isPasswordReset) {
        loadUserInfo();
    } else {
        loadOrder();
    }
};

orderListBtn.addEventListener("click", loadOrder);
userInfoBtn.addEventListener("click", loadUserInfo);
// loadOrder();

passwordResetLoadPage();
