import * as Api from "../api.js";
import { isAdmin } from "../common.js";
import { createManageItem } from "../common.js";

const onload = async () => {
    const allProducts = await Api.get("/api/product/productlist");
    const div = document.querySelector(".item-manage-info");
    allProducts.map((el) => {
        const divChild = createManageItem(el);
        const btn = divChild.querySelector("#item-revise-btn");
        btn.addEventListener("click", () => {
            window.location.href = `/productmodify?productNo=${el.no}`
        });
        divChild.className = "manage-info";
        div.appendChild(divChild);
    });
};

isAdmin();
onload();
