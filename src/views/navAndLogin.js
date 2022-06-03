// 각 페이지 <nav>태그 안의 요소를 모두 지우고 밑에 내용을 head에 추가해주세요
// <script src="../navBar.js" type="module" defer></script>

// ++ nav Bar에 로그인 모달창 같이 분리

import * as Api from "/api.js";
import { validateEmail } from "/useful-functions.js";

function navBarCreate() {
    const nav = document.querySelector("nav");
    const loginModal = document.querySelector(".loginModal");
    const footer = document.querySelector("footer");
    
    nav.innerHTML = `<div class="navBar-container">
                        <a href="/" class="nav-brand">
                            <!-- 로고 이미지 추가 시 추가 작성-->
                            <span class="nav-brand_name">Project17</span>
                        </a>
                        <ul class="nav-category">
                            <li class="nav-category_list"><a class="best-btn">best</a></li>
                            <li class="nav-category_list"><a href="/event">event</a></li>
                            <li class="nav-category_list"><a href="/shop">product</a></li>
                            <li class="nav-category_list"><a href="#">about</a></li>
                        </ul>
                        <div class="nav-menu">
                            <a href="/shop">
                                <i class="material-symbols-outlined nav-menu_icon shop">
                                    checkroom
                                </i>
                            </a>
                            <a class="cart" href="/cart">
                                <i class="material-symbols-outlined nav-menu_icon">
                                    shopping_bag
                                </i>
                                <div class="count">
                                    <span>0</span>
                                </div>
                            </a>
                            <div class="personalMenu">
                                <button id="personalIcon">
                                    <i class="material-symbols-outlined nav-menu_icon">
                                        person
                                    </i>
                                </button>
                                <div class="personalMenu-buttons">
                                    <button>마이페이지</button>
                                    <button>계정관리</button>
                                    <button id="logout">로그아웃</button>
                                </div>
                                <div class="check">
                                    <span>✔</span>
                                </div>
                            </div>
                        </div>
                        `;

    loginModal.innerHTML = `<div class="login modal hidden">
                                <div class="modal-overlay"></div>
                                <div class="login-form-container modal-content">
                                    <span class="closeBtn">X</span>
                                    <form class="login-form">
                                        <div class="title">
                                            <p>Project17</p>
                                            <p class="subtitle">LogIn</p>
                                        </div>
                                        <div class="login-form_input">
                                            <a href="/register" class="register">회원 가입</a>
                                            <div class="control">
                                                <input
                                                    class="input emailInput"
                                                    type="email"
                                                    placeholder="Email Address"
                                                    autocomplete="on"
                                                />
                                            </div>
                                            <div class="control">
                                                <input
                                                    class="input passwordInput"
                                                    type="password"
                                                    placeholder="Password"
                                                    autocomplete="on"
                                                />
                                            </div>
                                            <a href="/findpassword" class="findPassword">비밀번호 찾기</a>
                                        </div>
                                        <div class="submitBtns">
                                            <button class="loginButton">로그인</button>
                                            <button class="kakao-login" onclick="event.preventDefault()">
                                                카카오계정 로그인
                                            </button>
                                            <button class="login-submitButton" onclick="event.preventDefault()">
                                                구글계정 로그인
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>                 
                                    `;

    footer.innerHTML = `<div class="footer-col">
                            <div class="footer-brandName" style="margin-right:1rem;">Project17</div>
                            <div class="footer-slogan">/SIMPLE IS BEST/</div>
                            <div class="footer-contributor">Contributed By @강예정 @김동철 @이용준 @조희승 @심주용</div>
                        </div>`;
}

//navBar component 분리
navBarCreate();
const logoutBtn = document.querySelector("#logout");
const personalIcon = document.querySelector("#personalIcon");
const personalMenu = document.querySelector(".personalMenu-buttons");
// const allArea = document.querySelector("main");

//login modal
const loginModal = document.querySelector(".modal");
const emailInput = document.querySelector(".emailInput");
const passwordInput = document.querySelector(".passwordInput");
const submitButton = document.querySelector(".loginButton");
const modalClose = document.querySelector(".closeBtn");
const modalOverlay = document.querySelector(".modal-overlay");
const loginCheck = document.querySelector(".check");

//카카오 로그인(잘못된 로직으로 판명... 카카오톡 로그인 정보를 데이터에 넣는 건 백단에서 해야할 문제 )
const kakaoLoginBtn = document.querySelector(".kakao-login");
Kakao.init("738b82b958ee938f73a2a62aaecce547");

function kakaoLogin() {
    window.Kakao.Auth.login({
        scope: "profile_nickname, account_email",
        success: function (authObj) {
            window.Kakao.API.request({
                url: "/v2/user/me",
                success: async (res) => {
                    const kakao_account = res.kakao_account;
                    const email = kakao_account.email;
                    const fullName = kakao_account.profile.nickname;
                    // 임의의 비밀번호를 어떻게 처리해야할 지 모르겠음. (현재 그냥 임의로 설정)
                    // 이러면 모든 카카오계정의 비밀번호가 똑같다.
                    // 보안 취약.(여기서가 크리티컬한 문제인듯)
                    const password = "Q1W2E3R4T5Y7U8Z0K3ADN9";

                    // 이미 등록된 이메일인지 확인

                    const isEmail = await Api.post("/api/checkUser", { email });
                    const data = { email, fullName, password };

                    // 등록되지 않았을 경우에만 user 데이터에 저장
                    if (!isEmail) {
                        try {
                            await Api.post("/api/register", data);

                            const result = await Api.post("/api/login", data);
                            const token = result.token;
                            sessionStorage.setItem("token", token);

                            alert("카카오 계정으로 가입 및 로그인 되었습니다");
                            loginModal.classList.add("hidden");
                            loginCheckAppear();
                        } catch (err) {
                            console.log(err);
                        }
                    } else {
                        try {
                            const data = { email, password };
                            const result = await Api.post("/api/login", data);
                            const token = result.token;

                            // 로그인 성공, 토큰을 세션 스토리지에 저장
                            // 물론 다른 스토리지여도 됨
                            sessionStorage.setItem("token", token);

                            alert(`카카오톡 계정으로 로그인되었습니다.`);

                            // 로그인 성공

                            // 로그인모달 없애서 현재 페이지에 잔류
                            loginModal.classList.add("hidden");
                            loginCheckAppear();
                        } catch (err) {
                            console.error(err.stack);
                            alert(
                                `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
                            );
                        }
                    }
                },
            });
        },
    });
}

kakaoLoginBtn.addEventListener("click", kakaoLogin);

// 로그인 되어 있으면 토큰 확인해서 사용자페이지로 이동
// 그렇지 않을 시 로그인 모달창 생성

personalMenu.style.display = "none"; // 처음에 안보이게 전역처리

async function personalIconClick() {
    const token = sessionStorage.getItem("token"); // 여기부터 4줄 전역처리하면 작동을 안함. 왜안하는지...
    const keys = Object.keys(localStorage);
    const kakaoKey = keys.find((e) => e.startsWith("kakao"));
    const kakaoToken = localStorage.getItem(kakaoKey);

    if (token || kakaoToken) {
        //personalMenu.style.display 를 변수로 설정하면 작동을 안함
        personalMenu.style.display === "block"
            ? (personalMenu.style.display = "none")
            : (personalMenu.style.display = "block");
    } else {
        loginModal.classList.toggle("hidden");
    }
}

//로그인 체크 표시 (로그인/로그아웃 완료 시 작동하도록 추가)
function loginCheckAppear() {
    const token = sessionStorage.getItem("token");
    const keys = Object.keys(localStorage);
    const kakaoKey = keys.find((e) => e.startsWith("kakao"));
    const kakaoToken = localStorage.getItem(kakaoKey);

    if (token || kakaoToken) {
        loginCheck.style.display = "";
    } else {
        loginCheck.style.display = "none";
    }
}

//모달 창 닫기
function modalCloseClick() {
    loginModal.classList.add("hidden");
}

modalClose.addEventListener("click", modalCloseClick);
modalOverlay.addEventListener("click", modalCloseClick);

//권한에 따른 마이페이지 이동
async function personalPageLoad() {
    const user = await Api.get("/api/profile/myProfile");
    const role = user.role;
    role === "admin"
        ? (location.href = "/admin")
        : (location.href = "/profile");
}

// 로그아웃 버튼 => 세션스토리지 내 토큰 삭제
function logout(e) {
    e.preventDefault();
    const keys = Object.keys(localStorage);
    const kakaoKey = keys.find((e) => e.startsWith("kakao"));
    localStorage.removeItem(kakaoKey);
    sessionStorage.removeItem("token");
    loginCheckAppear();
    alert("정상적으로 로그아웃되었습니다.");
    location.href = "/";
}

// login 기능 ////////////////////////////
// 로그인 진행
async function handleSubmit(e) {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    // 잘 입력했는지 확인
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 4;

    if (!isEmailValid || !isPasswordValid) {
        return alert(
            "비밀번호가 4글자 이상인지, 이메일 형태가 맞는지 확인해 주세요."
        );
    }

    // 로그인 api 요청
    try {
        const data = { email, password };
        const result = await Api.post("/api/login", data);
        const token = result.token;
        const isPasswordReset = result.passwordReset;

        // 로그인 성공, 토큰을 세션 스토리지에 저장
        // 물론 다른 스토리지여도 됨
        sessionStorage.setItem("token", token);

        if (isPasswordReset) {
            alert("임시 비밀번호로 로그인되었습니다. 비밀번호를 수정해주세요");
            location.href = "/profile";
        } else {
            alert(`정상적으로 로그인되었습니다.`);
        }

        loginModal.classList.add("hidden");
        loginCheckAppear();
    } catch (err) {
        console.error(err.stack);
        alert("이메일 계정 및 비밀번호를 확인해주세요");

    }
}

logoutBtn.addEventListener("click", logout);
personalIcon.addEventListener("click", personalIconClick);
loginCheck.addEventListener("click", personalIconClick);
personalMenu.addEventListener("click", personalPageLoad);

// 로그인
submitButton.addEventListener("click", handleSubmit);

//로그인 체크
loginCheckAppear();

// 장바구니 아이콘 아이템 수
var count = 0;
export const loadCartItem = () => {
    count = 0;
    let cartItems = !JSON.parse(localStorage.getItem("cart"))
        ? []
        : JSON.parse(localStorage.getItem("cart"));

    if (cartItems === []) {
        count = 0;
    } else {
        for (let i = 0; i < cartItems.length; i++) {
            count += Number(cartItems[i].productQuantity);
        }
    }
    const addShoppingCart = document.querySelector(".count");
    addShoppingCart.innerHTML = `<span>${count}</span>`;
};

loadCartItem();