import * as Api from "/api.js";

const statisticArrow = document.getElementById("arrow");
const statisticInfo = document.querySelector(".static-info");
const manageOrder = document.getElementById("manage-order");
const registerItem = document.getElementById('register-item');


const handlerOnClick = () => {
    onClickArrow();
};

const handlerOnClickManage = () => {
    routeManage();
};

const handlerOnClickRegister = () => {
    routeRegiterItem();
}

const onClickArrow = async () => {
    if (statisticInfo.style.display === "block") {
        statisticInfo.style.display = "none";
    } else {
        statisticInfo.style.display = "block";
    }
};

const routeManage = () => {
    window.location.href = "/manageorder";
};

const routeRegiterItem = () => {
    window.location.href = "/productregister"
}

const checkAdmin = async function () {
    const isAdmin = await Api.get("/api/admin/adminPage");
    console.log(isAdmin);
};

//admin인지 체크하는 함수입니다.
await checkAdmin();

statisticArrow.addEventListener("click", handlerOnClick);
manageOrder.addEventListener("click", handlerOnClickManage);
registerItem.addEventListener('click', handlerOnClickRegister);