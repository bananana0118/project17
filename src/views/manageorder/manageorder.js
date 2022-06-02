import * as Api from '../api.js';
import { createOrderItem } from '../common.js';
const stateChangeBtn = document.querySelector('#state-change-btn');

const popUp = () => {
    console.log('asdf')
}

const onload = async () => {
    const allOrders = await Api.get('/api/order/getAllOrder')
    const div = document.querySelector('.order-manage-info')
    allOrders.map(el => {
        const divChild = createOrderItem(el);
        const btn = divChild.querySelector('#state-change-btn');
        btn.addEventListener('click', popUp);
        div.appendChild(divChild);
    })

    
}


onload();
