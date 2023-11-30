import {refreshToken} from './token_refresh.mjs'

const urlParams = new URLSearchParams(window.location.search);
const $id = urlParams.get('id');
const $language = urlParams.get('language');
const $convention = urlParams.get('convention');

const $access_token = localStorage.getItem('access_token');
const $refresh_token = localStorage.getItem('refresh_token');

const $content_language = document.getElementById('content_language');
const $content_convention = document.getElementById('content_convention');
const $content_message = document.getElementById('content_message');

const $input_message = document.getElementById('input_message');
const $button_send = document.getElementById('button_send');


const getChatDetail = async (e) => {
    const url = `http://127.0.0.1:8000/chat/${$id}`
    await fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${$access_token}`,
        },
    }).then(async (res) => {
        const data = await res.json()
        if (res.ok) {
            $content_language.textContent = $language;
            $content_convention.textContent = $convention;
            for (const item of data) {
                const messageElement = document.createElement('div');
                messageElement.classList.add(item.is_user ? 'user' : 'chatbot');

                const tagElement = document.createElement('p');
                const contentElement = document.createElement('code');

                if (item.is_user) {
                    tagElement.textContent = '<user>';
                    contentElement.textContent = item.content;
                } else {
                    tagElement.textContent = '<chatbot>';
                    contentElement.innerHTML = item.content.replace(/\\n/g, '<br>');
                }

                messageElement.appendChild(tagElement);
                messageElement.appendChild(contentElement);
                $content_message.appendChild(messageElement);
            }
        } else if (response.status === 401) {
            await refreshToken();
            await postChatDetail();
        } else {
            alert("로그인 후 이용해주세요")
        }
    }).catch((err) => {
        console.log(err);
        // location.href = '/Ormi-Chatbot-FE/login.html';
    })
};

const postChatDetail = async (e) => {
    const url = `http://127.0.0.1:8000/chat/${$id}/`
    e.preventDefault()
    const formdata = {
        // "user": userId,
        "chatpost": $id,
        "is_user": true,
        "content": $input_message.value,
        "refresh": $refresh_token,
    };
    await fetch(url, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${$access_token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
    }).then(async (res) => {
        const data = await res.json()
        if (res.ok) {
            console.log(data)
        } else if (response.status === 401) {
            await refreshToken();
            await postChatDetail();
        } else {
            alert("로그인 후 이용해주세요")
        }
    }).catch((err) => {
        console.log(err);
        // location.href = '/Ormi-Chatbot-FE/login.html';
    })
};

document.addEventListener('DOMContentLoaded', function () {
    getChatDetail();
});

$button_send.addEventListener('click', postChatDetail);