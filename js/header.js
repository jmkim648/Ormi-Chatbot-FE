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
            <a href="login.html" class="ml-4 hidden lg:block">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
            </a>
        </div>
    </div>
</div>
`
