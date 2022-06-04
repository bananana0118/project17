import * as Api from "../api.js";

const emailInput = document.querySelector(".findPW-input");
const transferPW = document.querySelector(".transferPW");
const btnText = document.querySelector(".transferPW span");
const loadingSpin = document.querySelector("#loading");

async function transferPWClick(e) {
    e.preventDefault();
    const email = emailInput.value;
    const checkEmail = await Api.post("/api/checkUser", { email });
    if (!checkEmail) {
        alert("가입되지 않은 이메일 주소입니다.");
        return;
    }
    btnText.style.display = "none";
    loadingSpin.style.display = "inline-block";
    try {
        await Api.post("/api/mail/reset-password", { email });
        alert(
            "임시 비밀번호가 발송되었습니다. 확인 후 비밀번호를 변경해주세요."
        );
        btnText.style.display = "inline";
        loadingSpin.style.display = "none";

        history.back();
    } catch (err) {
        console.error(err.stack);
        alert(`${err.message}`);
    }
}

transferPW.addEventListener("click", transferPWClick);
