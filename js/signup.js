const $button_signup = document.getElementById('button_signup');
const $input_email = document.getElementById('input_email');
const $input_password = document.getElementById('input_password');
const $input_password2 = document.getElementById('input_password2');
const $input_nickname = document.getElementById('input_nickname');

const emailSignup = async (e) => {
    e.preventDefault()
    const formdata = {
        "email": $input_email.value,
        "password": $input_password.value,
        "password2": $input_password2.value,
        "nickname": $input_nickname.value,
    };
    const url = 'http://127.0.0.1:8000/accounts/signup/'
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
    }).then(async (res) => {
        const data = await res.json()
        if (res.ok) {
            // 이후 여유되면 login 절차
            location.href= '/Ormi-Chatbot-FE/login.html'
        } else {
            alert(JSON.stringify(data))
        }
    }).catch((err) => {
        console.log(err);
    })
};

$button_signup.addEventListener('click', emailSignup);