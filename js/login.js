const $button_login = document.getElementById("button_login");
const $input_email = document.getElementById("input_email");
const $input_password = document.getElementById("input_password");

const email_login = async (e) => {
    e.preventDefault()
    const formdata = {
        "email": $input_email.value,
        "password": $input_password.value,
    };
    const url = 'http://127.0.0.1:8000/accounts/login/'
    console.log(JSON.stringify(formdata));
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
    }).then(async (res) => {
        const data = await res.json()
        if (res.ok) {
            localStorage.setItem('refresh_token', data['refresh_token']);
            localStorage.setItem('access_token', data['access_token']);
            location.href= '/Ormi-Chatbot-FE/index.html'
        } else {
            alert(JSON.stringify(data))
        }
    }).catch((err) => {
        console.log(err);
    })
};

$button_login.addEventListener('click', email_login);