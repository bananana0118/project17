import * as Api from "../api.js";

const emailInput = document.querySelector(".findPW-input");
const transferPW = document.querySelector(".transferPW");

async function transferPWClick(e) {
    e.preventDefault();
    const email = emailInput.value;
    console.log(email);
    try {
        // const a = await Api.post("/api/mail/send-message", email);
        // console.log(a);
        const res = await fetch("/api/mail/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(email),
        });
        console.log(res);
    } catch (err) {
        console.error(err.stack);
        alert(`${err.message}`);
    }
}

transferPW.addEventListener("click", transferPWClick);
