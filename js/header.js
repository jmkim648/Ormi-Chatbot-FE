const $header = document.getElementById("header");
$header.innerHTML = `
<div class="h-24 z-20 relative w-full mx-auto bg-black  flex items-center justify-between px-6">
    <a href="index.html" class="text-xl font-extrabold italic tracking-tighter text-white uppercase">Ormi3-Chatbot</a>
    <div class="text-white text-lg fixed bottom-0 left-0 lg:relative p-6 lg:p-0 w-full lg:w-auto max-w-lg">
        <div class="hidden lg:flex flex-col lg:flex-row items-center justify-center bg-black lg:bg-transparent pt-6 pb-8 lg:p-0 -mb-6 lg:m-0 rounded-t-3xl shadow-2xl lg:shadow-none font-bold uppercase italic lg:normal-case lg:font-normal not-italic">
            <!-- link -->
            <a href="index.html" class="my-2 lg:ml-6">Home</a>
            <a href="board_list.html" class="my-2 lg:ml-6">Board</a>
            <a href="chat_list.html" class="my-2 lg:ml-6">Chatbot</a>
            <!-- login/profile -->
            <a href="" class="my-2 lg:ml-6" id="button_profile">로그인</a>
        </div>
    </div>
</div>
`;


function updateLoginStatus(isLoggedIn) {
    const $button_profile = document.getElementById('button_profile');
    $button_profile.removeEventListener('click', handleLogin);
    $button_profile.removeEventListener('click', handleLogout);
    if (isLoggedIn) {
            $button_profile.textContent = 'Logout';
            $button_profile.addEventListener('click', handleLogout);
        } else {
            $button_profile.textContent = 'Login';
            $button_profile.addEventListener('click', handleLogin);
        }
}

document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('access_token') !== null;
    updateLoginStatus(isLoggedIn);
});

function handleLogin(e) {
    e.preventDefault();
    location.href = '/Ormi-Chatbot-FE/login.html';
}

function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    updateLoginStatus(false);
}
