import * as Api from "/api.js";

const statisticArrow = document.getElementById("arrow");
const statisticInfo = document.querySelector(".static-info");
const manageOrder = document.getElementById("manage-order");
console.log(manageOrder);

const handlerOnClick = () => {
  onClickArrow();
};

const handlerOnClickManage = () => {
  routeMange();
};

const onClickArrow = async () => {
  if (statisticInfo.style.display === "block") {
    statisticInfo.style.display = "none";
  } else {
    statisticInfo.style.display = "block";
  }
};

const routeMange = () => {
  window.location.href = "/admin/manage";
};

const checkAdmin = async function () {
  const isAdmin = await Api.get("/admin/adminPage");
  console.log(isAdmin);
};

//admin인지 체크하는 함수입니다.
await checkAdmin();


statisticArrow.addEventListener("click", handlerOnClick);
manageOrder.addEventListener("click", handlerOnClickManage);
