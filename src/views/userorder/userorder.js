import * as Api from "../api.js";
import { isAdmin } from "../common.js";
import { createUserOrderItem } from "../common.js";

const popUp = () => {
    console.log("asdf");
};

const onload = async () => {
    const urlParams = new URLSearchParams(location.search).get("email");
    const userOrders = await Api.get(`/api/order/myOrder/${urlParams}`);

    const div = document.querySelector(".order-manage-info");
    userOrders.map((el) => {
        const divChild = createUserOrderItem(el);
        const btn = divChild.querySelector("#state-change-btn");
        btn.addEventListener("click", popUp);
        divChild.className = "manage-info";
        div.appendChild(divChild);
        console.log(div);
    });
};

isAdmin();
onload();