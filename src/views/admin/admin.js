const statisticArrow = document.getElementById('arrow');
const statisticInfo = document.querySelector('.static-info');
const manageOrder = document.getElementById('manage-order');
console.log(manageOrder);
const handlerOnClick = () => {
    onClickArrow();
}

const handlerOnClickManage = () => {
    routeMange();
}

const onClickArrow = async () => {
    if(statisticInfo.style.display === "block"){
        statisticInfo.style.display= "none";
    }
    else{
        statisticInfo.style.display= "block";
    }
}

const routeMange = () => {
    window.location.href = "/admin/manage";
}

statisticArrow.addEventListener('click', handlerOnClick);
manageOrder.addEventListener('click', handlerOnClickManage);