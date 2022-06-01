import * as Api from '../api.js';
import { createOrderItem } from '../common.js';

const dummyData = [{
    createAt: "2022-05-31",
    orderProduct: "반팔 셔츠 및 5종",
    status: "배송 준비중",
}]

const onload = async () => {
    //const getData = await Api.get('/api/product/productlist')
    const div = document.querySelector('.order-manage-info')
    dummyData.map(el => {
        const divChild = createOrderItem(el);
        console.log(divChild);
        div.appendChild(divChild)
    })
}


onload();
