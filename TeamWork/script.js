let containerLogin = document.querySelector('.container__login')
let containerGpt = document.querySelector('.container__gpt')
let containerHistoryButton = document.querySelector('.container__history-button')
let containerHistory = document.querySelector('.container__history')
containerLogin.addEventListener('click', function(){
    containerGpt.classList.toggle('general__dnone')
})
containerHistoryButton.addEventListener('click', function(){
    containerHistory.classList.toggle('general__dnone')
})