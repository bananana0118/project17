import * as Api from "/api.js";

// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector("#fullNameInput");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const passwordConfirmInput = document.querySelector("#passwordConfirmInput");
const mobileNumberInput = document.querySelector("#mobileNumber");
const addressInput = document.querySelector("#address");
const submitButton = document.querySelector("#submitButton");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener("click", handleSubmit);
}

// 상품 등록 진행
async function handleSubmit(e) {
  e.preventDefault();
  const fullName = fullNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const mobileNumber = mobileNumberInput.value;
  const address = addressInput.value;

  //데이터 수정시 어떤걸 주고받을지 논의
  try {
    const data = {
      fullName,
      email,
      password,
      passwordConfirm,
      //   mobileNumber,
      //   address,
    };

    console.log("불러오기" + data);
    const testEmail = "dd@dd.com";
    const updateUser = await Api.patch("/profile", testEmail, data);

    console.log("update" + updateUser);
    console.log(`정상적으로 불러왔습니다.`);

    // 기본 페이지로 이동
    window.location.href = `/profile/${testEmail}`;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

//데이터 get요청 테스트코드
// try {
//     const data = {
//       fullName,
//       email,
//       password,
//       passwordConfirm,
//       mobileNumber,
//       address,
//     };

//     console.log("불러오기" + data);
//     const testEmail = "dd@dd.com";
//     const updateUser = await Api.get(`/profile/${testEmail}`);

//     console.log(`정상적으로 불러왔습니다.`);

//     // 기본 페이지로 이동
//     window.location.href = `/profile/${testEmail}`;
//   } catch (err) {
//     console.error(err.stack);
//     alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
//   }
