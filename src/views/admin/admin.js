import * as Api from "/api.js";
import { isAdmin } from "../common.js";
import { createStaticItem } from "../common.js";

const statisticArrow = document.getElementById("arrow");
const statisticInfo = document.querySelector(".static-info");
const manageOrder = document.getElementById("manage-order");
const registerItem = document.getElementById('register-item');
<<<<<<< Updated upstream
const manageItem = document.getElementById('manage-item');
=======
const selectBox = document.getElementById('day-box');
const dateText = document.getElementById('date-txt');
const totalText = document.getElementById('total-txt');
const statisticInfoBox = document.querySelector('.static-info-box')
>>>>>>> Stashed changes

isAdmin();

const handlerOnClick = () => {
    onClickArrow();
};

const handlerOnClickManage = () => {
    routeManage();
};

const handlerOnClickRegister = () => {
    routeRegiterItem();
}

const handlerOnClickManageProduct = () => {
    routeManageItem();
}

const onClickArrow = async () => {
    if (statisticInfo.style.display === "block") {
        statisticInfo.style.display = "none";
    } else {
        statisticInfo.style.display = "block";
    }
};

const onLoad = async () => {
    const date = new Date();
    const dates = [
        new Date(date.setDate(date.getDate() - 5)),
        new Date(date.setDate(date.getDate() + 1)),
        new Date(date.setDate(date.getDate() + 1)),
        new Date(date.setDate(date.getDate() + 1)),
        new Date(date.setDate(date.getDate() + 1)),
        new Date(date.setDate(date.getDate() + 1))
    ]
    const idx = Number(selectBox.value);
    let sumPrice = 0
    dateText.innerText = dates[idx].getFullYear() + ' - ' + Number(dates[idx].getMonth() + 1) + ' - ' + dates[idx].getDate();
    const data = { year:dates[idx].getFullYear(), month: dates[idx].getMonth(), day: dates[idx].getDate() }
    const OrderList = await Api.post('/api/order/getOrderByday', data);
    
    while(statisticInfoBox.hasChildNodes()){
        statisticInfoBox.removeChild(statisticInfoBox.firstChild)
    }
    OrderList.map(el => {
        const divChild = createStaticItem(el);
        statisticInfoBox.appendChild(divChild);
        sumPrice += el.totalPrice
    })
    totalText.innerText = sumPrice + '원'
}

onLoad();

const routeManage = () => {
    window.location.href = "/manageorder";
};

const routeRegiterItem = () => {
    window.location.href = "/productregister";
}

const routeManageItem = () => {
    window.location.href = "/manageproduct";
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
<<<<<<< Updated upstream
manageItem.addEventListener("click", handlerOnClickManageProduct);
=======
selectBox.addEventListener('change', onLoad);
>>>>>>> Stashed changes
