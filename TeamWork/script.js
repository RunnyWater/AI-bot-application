let containerLogin = document.querySelector('.container__login')
let containerGpt = document.querySelector('.container__gpt')
let containerHistoryButton = document.querySelector('.container__history-button')
let containerHistory = document.querySelector('.container__history')
let containerSubmit = document.querySelector('.container__submit')
let containerInput = document.querySelector('.container__input')
let containerAnswer = document.querySelector('.container__answer')
let containerAnswerText = document.querySelector('.container__answer-text')

containerHistoryButton.addEventListener('click', function(){
    containerHistory.classList.toggle('general__dnone')
})