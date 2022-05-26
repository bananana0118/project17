// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from "/api.js";
import { randomId } from "/useful-functions.js";

// import { navBarCreate } from "../navBar.js";

// navBarCreate();

// const logoutBtn = document.querySelector("#logout");
// const loginBtn = document.querySelector("#login");

// function buttonAppear() {
//     const token = sessionStorage.getItem("token");
//     if (!token) {
//         logoutBtn.style.display = "none";
//         loginBtn.style.display = "block";
//     } else if (token) {
//         logoutBtn.style.display = "block";
//         loginBtn.style.display = "none";
//     }
// }

// function logout(e) {
//     e.preventDefault();
//     sessionStorage.removeItem("token");
//     alert("정상적으로 로그아웃되었습니다.");
//     buttonAppear();
// }

// logoutBtn.addEventListener("click", logout);
// buttonAppear();

// 요소(element), input 혹은 상수

// addAllElements();
// addAllEvents();

// // html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
// async function addAllElements() {
//     insertTextToLanding();
//     insertTextToGreeting();
// }

// // 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
// function addAllEvents() {
//     landingDiv.addEventListener("click", alertLandingText);
//     greetingDiv.addEventListener("click", alertGreetingText);
// }

async function getDataFromApi() {
    // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
    const data = await Api.get("/api/user/data");
    const random = randomId();

    console.log({ data });
    console.log({ random });
}

되라 쫌