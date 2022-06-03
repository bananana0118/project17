import { createItem } from "../common.js";
import * as Api from "../api.js";
import { addCommas } from "../useful-functions.js";

const ul = document.querySelector(".order-item-list");
const selectedEmail = document.querySelector("#select-email");
const paymentBtn = document.querySelector("#payment-btn");
const fullName = document.querySelector("#input-name");
const phoneNumberMiddle = document.querySelector("#input-middle-num");
const phoneNumberLast = document.querySelector("#input-last-num");
const emailHead = document.querySelector("#input-email-head");
const emailTail = document.querySelector("#input-email-tail");
const zipcode = document.querySelector("#zipcode");
const address1 = document.querySelector("#input-address1");
const address2 = document.querySelector("#input-address2");
const loginModal = document.querySelector(".login");

const getUserInfo = async () => {
    const user = await Api.get("/api/profile/myProfile");

    const splitPhoneNumberMiddle = user.phoneNumber.substr(3, 4);
    const splitPhoneNumberLast = user.phoneNumber.substr(7, 4);
    const splitEmail = user.email.split("@");

    fullName.value = user.fullName;
    phoneNumberMiddle.value = splitPhoneNumberMiddle;
    phoneNumberLast.value = splitPhoneNumberLast;
    emailHead.value = splitEmail[0];
    emailTail.value = splitEmail[1];
    zipcode.value = user.address.postalCode;
    address1.value = user.address.address1;
    address2.value = user.address.address2;
};

getUserInfo();

const changeDomain = () => {
    document.querySelector("#input-email-tail").value = selectedEmail.value;
};

selectedEmail.addEventListener("change", changeDomain);

let sumPrice = 0;

// 더미데이터 -> 장바구니 데이터로 교체 예정
let orderItems = !localStorage.getItem("buyOne")
    ? JSON.parse(localStorage.getItem("cart"))
    : JSON.parse(localStorage.getItem("buyOne"));
localStorage.removeItem("buyOne");

const register = async () => {
    const orderProduct = orderItems;
    const address =
        document.querySelector("#input-address1").value +
        document.querySelector("#input-address2").value;
    const phoneNumber =
        "010" +
        document.querySelector("#input-middle-num").value +
        document.querySelector("#input-last-num").value;
    const totalPrice = sumPrice;

    //로그인하지 않은 사용자 alert 추가
    const token = sessionStorage.getItem("token");

    if (token) {
        const data = { orderProduct, address, phoneNumber, totalPrice };
        console.log(data);
        if (phoneNumber.length < 11) {
            alert("전화번호를 입력해주세요!");
            document.querySelector("#input-middle-num").focus();
        } else if (zipcode.value === "") {
            alert("주소를 입력해주세요");
            zipcode.focus();
        } else {
            const res = await Api.post("/api/order/cart", data);
            alert("결제가 완료되었습니다!");
            window.location.href = "/profile";
        }
    } else {
        loginModal.classList.remove("hidden");
        alert("로그인 후 이용해주세요.");
    }
};

paymentBtn.addEventListener("click", register);

const renderItems = () => {
    sumPrice = 0;
    orderItems.map((el) => {
        const li = createItem(el);
        ul.appendChild(li);
        sumPrice += el.productTotalprice;
    });

    document.querySelector(".sumprice").innerHTML = addCommas(Number(sumPrice));
    document.querySelector(".saleinfo").innerHTML = addCommas(
        Math.floor(Number(sumPrice) * 0.1)
    );
    document.querySelector(".totalprice").innerHTML = addCommas(
        Math.floor(Number(sumPrice) * 0.9)
    );
};

renderItems();
