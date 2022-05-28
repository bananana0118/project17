
/* 초기화 initView(ul엘리먼트의 id, 최초 보여지는 li 엘리먼트 갯수, display 값) */
function initView(el_id, view_item_count, style) {
    var menu = document.getElementById(el_id);
    var menu_list = menu.getElementsByTagName('li');
    var menu_count = menu_list.length;
    style = (typeof (style) != 'undefined') ? style : 'block';
    for (var i = 0; i < menu_count; i++){
        if (i < view_item_count)
            menu_list[i].style.display = style;
        else
            menu_list[i].style.display = 'none';
    }
}

/* 목록 이동 moveList(이동시킬방향 prev 또는 next, 이동시킬 ul 엘리먼트의 id, 보여질 목록 갯수, 이동시킬 갯수, display 값) */
function moveList(direction, el_id, view_item_count, scroll_count, style) {
    var menu = document.getElementById(el_id);
    var menu_list = menu.getElementsByClassName('thumbnail');
    var menu_count = menu_list.length;
    var start_no = 0;
    style = (typeof (style) != 'undefined') ? style : 'block';
    
    // 현재 보여지고 있는 엘리먼트의 시작을 확인    
    for (var i = 0; i < menu_count; i++){
        if (menu_list[i].style.display == style) {
            start_no = i; break;
        }
    }

    // 방향에 따른 이동    
    if (direction == 'next') {
        if (menu_list[menu_count - 1].style.display == style)
            return false;
        else {
            for (var i = 0; i < menu_count; i++){
                if (i >= start_no + scroll_count && i < start_no + scroll_count + view_item_count) {
                    menu_list[i].style.display = style;
                } else {
                    menu_list[i].style.display = 'none';
                }
            }
        }
    } else if (direction == 'prev') {
        if (menu_list[0].style.display == style)
            return false;
        else {
            for (var i = 0; i < menu_count; i++){
                if (i >= start_no - scroll_count && i < start_no - scroll_count + view_item_count) {
                    menu_list[i].style.display = style;
                } else {
                    menu_list[i].style.display = 'none';
                }
            }
        }
    }
}

// 8개씩 출력
initView('ul', 24);


// 이미지 슬라이드
var imgArray = new Array();
imgArray[0] = "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387";
imgArray[1] = "https://images.unsplash.com/photo-1614251055880-ee96e4803393?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387";

imgArray[2] = "https://images.unsplash.com/photo-1584865288642-42078afe6942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
imgArray[3] = "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687";

imgArray[4] = "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387";
imgArray[5] = "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387";

imgArray[6] = "https://images.unsplash.com/photo-1551854838-212c50b4c184?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387";
imgArray[7] = "https://images.unsplash.com/photo-1638394440667-aa54a7c0a703?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387";

imgArray[8] = "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387";
imgArray[9] = "https://images.unsplash.com/photo-1614251055880-ee96e4803393?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387";

imgArray[10] = "https://images.unsplash.com/photo-1584865288642-42078afe6942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
imgArray[11] = "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687";

imgArray[12] = "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387";
imgArray[13] = "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387";

imgArray[14] = "https://images.unsplash.com/photo-1551854838-212c50b4c184?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387";
imgArray[15] = "https://images.unsplash.com/photo-1638394440667-aa54a7c0a703?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387";


const imgNum = []
for (let i = 0; i < 8; i++) {
    imgNum.push(i * 2);
}

function showImage() {  
    const objImg = document.getElementsByClassName("introimg");

    for (let i = 0; i < 8; i++) {
        objImg[i].src = imgArray[imgNum[i]];
        imgNum[i] += 1;
    }

    if (imgNum[0] > 1) {
        for (let i = 0; i < 8; i++) {
            imgNum[i] = i * 2;
        }
    }

    setTimeout(showImage, 2000);
}

window.onload = showImage();

// 상품 이름, 가격, 할인 가격 불러오기
