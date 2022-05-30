// 각 페이지 <nav>태그 안의 요소를 모두 지우고 밑에 내용을 head에 추가해주세요
// <script src="../navBar.js" type="module" defer></script>
function navBarCreate() {
    const nav = document.querySelector("nav");

    nav.innerHTML = `<div class="navBar-container container">
                        <a href="/" class="nav-brand">
                            <!-- 로고 이미지 추가 시 추가 작성-->
                            <span class="nav-brand_name">Project17</span>
                        </a>
                        <ul class="nav-category">
                            <li class="nav-category_list"><a href="#">new</a></li>
                            <li class="nav-category_list"><a href="/product">product</a></li>
                            <li class="nav-category_list"><a href="#">sales</a></li>
                            <li class="nav-category_list"><a href="#">about</a></li>
                        </ul>
                        <div class="nav-menu">
                            <a href="#">
                                <i class="material-symbols-outlined nav-menu_icon">
                                    search
                                </i>
                            </a>
                            <a href="#">
                                <i class="material-symbols-outlined nav-menu_icon">
                                    shopping_bag
                                </i>
                            </a>
                            <a id="personalPage" href="#">
                                <i class="material-symbols-outlined nav-menu_icon">
                                    person
                                </i>
                            </a>
                            <!-- 로그아웃 버튼 -->
                            <a href="/login"><button id="login">로그인</button></a>
                            <button id="logout">로그아웃</button>
                        </div>
                        <script>
                        `;
}

//navBar component 분리
navBarCreate();
const logoutBtn = document.querySelector("#logout");
const loginBtn = document.querySelector("#login");
const personalPage = document.querySelector("#personalPage");

function logoutAppear() {
    const token = sessionStorage.getItem("token");
    if (!token) {
        logoutBtn.style.display = "none";
        loginBtn.style.display = "block";
    } else if (token) {
        logoutBtn.style.display = "block";
        loginBtn.style.display = "none";
    }
}

// 로그아웃 버튼 => 세션스토리지 내 토큰 삭제
function logout(e) {
    e.preventDefault();
    sessionStorage.removeItem("token");
    alert("정상적으로 로그아웃되었습니다.");
    logoutAppear();
}

// 로그인 되어 있으면 토큰 확인해서 사용자페이지로 이동
// 그렇지 않을 시 로그인 페이지로 이동
function myPageLoad() {
    const token = sessionStorage.getItem("token");
    console.log("?");
    if (!token) {
        location.href = "/login";
    } else {
        location.href = "/profile";
    }
}

logoutBtn.addEventListener("click", logout);
personalPage.addEventListener("click", myPageLoad);
logoutAppear();
