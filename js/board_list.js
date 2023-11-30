import { decodeJwtToken } from './decodeJwt.mjs';
import { refreshToken } from './token_refresh.mjs'

const $access_token = localStorage.getItem('access_token');
const $refresh_token = localStorage.getItem('refresh_token');

const $board_list = document.getElementById('board_list');

const $button_create = document.getElementById('button_create');
const decodedToken = decodeJwtToken($access_token);
const userId = getUserID(decodedToken);

function getUserID(token) {
    if (token !== undefined) {
        return token.user_id;
    }
}

const getBoardList = async (e) => {
    const url = 'http://127.0.0.1:8000/board/'
    await fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${$access_token}`,
        },
    }).then(async (res) => {
        const data = await res.json()
        if (res.ok) {
            console.log(data);
            for (const item of data) {
                const card = createBoardCard(item.title, item.content, item.head_image);
                $board_list.appendChild(card);
            }
        } else if (response.status === 401) {
            await refreshToken();
        } else {
            // alert("로그인 후 이용해주세요")
        }
    }).catch((err) => {
        console.log(err);
        // location.href = '/Ormi-Chatbot-FE/login.html';
    })
};

function createBoardCard(title, content, img) {
    const newDiv = document.createElement('div');
    newDiv.className = 'rounded-2xl overflow-hidden';

    const newImg = document.createElement('img');
    if (img) {
        newImg.src = img;
    } else {
        newImg.src = 'https://picsum.photos/200';
    }
    
    newImg.className = 'w-full h-[150px] object-cover';

    const innerDiv = document.createElement('div');
    innerDiv.className = 'p-4 bg-white';

    const headerElement = document.createElement('header');
    const titleElement = document.createElement('h3');
    titleElement.className = 'font-bold text-ellipsis whitespace-nowrap overflow-hidden';
    titleElement.textContent = title;
    headerElement.appendChild(titleElement);

    const contentElement = document.createElement('p');
    contentElement.className = 'text-gray-400 text-sm';
    if (content.length > 10) {
        let shortContent = content.slice(0, 10);
        shortContent += '...';
        contentElement.textContent = shortContent;
    } else {
        contentElement.textContent = content;
    }

    innerDiv.appendChild(headerElement);
    innerDiv.appendChild(contentElement);

    newDiv.appendChild(newImg);
    newDiv.appendChild(innerDiv);

    return newDiv;
}


document.addEventListener('DOMContentLoaded', function () {
    getBoardList();
});
