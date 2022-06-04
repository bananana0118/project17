import nomeMailer from "nodemailer";

const transport = nomeMailer.createTransport({
    service: "Gmail",
    auth: {
        user: "bananana0118@gmail.com",
        pass: "gaksqzyicqbfqert",
    },
});

module.exports = (to, subject, text) =>
    new Promise((resolve, reject) => {
        const message = {
            from: "bananana0118@gmail.com",
            to,
            subject,
            text,
        };

        transport.sendMail(message, (err, info) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(info);
        });
    });
