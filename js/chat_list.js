import { decodeJwtToken } from './decodeJwt.mjs';
import { refreshToken } from './token_refresh.mjs'

const $access_token = localStorage.getItem('access_token');
const $refresh_token = localStorage.getItem('refresh_token');
const $chat_card = document.getElementById('chat_card');
const $button_create = document.getElementById('button_create');
const $input_language = document.getElementById('input_language');
const $input_convention = document.getElementById('input_convention');
const decodedToken = decodeJwtToken($access_token);
const userId = decodedToken.user_id;


const getChatList = async (e) => {
    const url = 'http://127.0.0.1:8000/chat/'
    await fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${$access_token}`,
        },
    }).then(async (res) => {
        const data = await res.json()
        if (res.ok) {
            for (const item of data) {
                const card = createChatCard(item.language, item.convention, item.id);
                $chat_card.appendChild(card);
            }
        } else if (response.status === 401) {
            await refreshToken();
            await postChatDetail();
        } else {
            alert("로그인 후 이용해주세요")
        }
    }).catch((err) => {
        console.log(err);
        location.href = '/Ormi-Chatbot-FE/login.html';
    })
};

const postChatList = async (e) => {
    const url = 'http://127.0.0.1:8000/chat/'
    e.preventDefault()
    const formdata = {
        "user": userId,
        "language": $input_language.value,
        "convention": $input_convention.value,
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
        location.href = '/Ormi-Chatbot-FE/login.html';
    })
};


function createChatCard(language, convention, id) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('rounded-2xl', 'overflow-hidden', 'mb-4');

    const cardContent = document.createElement('div');
    cardContent.classList.add('p-4', 'bg-white');

    const header = document.createElement('header');
    header.classList.add('mb-2');

    const languageHeader = document.createElement('h3');
    languageHeader.classList.add('font-bold', 'text-ellipsis', 'whitespace-nowrap', 'overflow-hidden');
    languageHeader.textContent = `언어 : ${language}`;

    const conventionParagraph = document.createElement('p');
    conventionParagraph.classList.add('text-gray-400', 'text-sm');
    if (convention === null || convention === "") {
        conventionParagraph.textContent = '컨벤션 : 없음';
    } else {
        conventionParagraph.textContent = `컨벤션 : ${convention}`;
    }


    header.appendChild(languageHeader);
    cardContent.appendChild(header);
    cardContent.appendChild(conventionParagraph);
    cardContainer.appendChild(cardContent);

    cardContainer.addEventListener('click', () => {
        handleCardClick(id, language, convention);
    });

    return cardContainer;
}

function handleCardClick(id, language, convention) {
    window.location.href = `/Ormi-Chatbot-FE/chat_detail.html?id=${id}&language=${language}&convention=${convention}`;
}

document.addEventListener('DOMContentLoaded', function () {
    getChatList();
});

$button_create.addEventListener('click', postChatList);
