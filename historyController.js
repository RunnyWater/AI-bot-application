
// Загрузка всей истории из файла
function loadHistory(){
    const data = fs.readFileSync('history.json', 'utf8');
    return JSON.parse(data);
}

// Загрузка истории пользователя из файла
function loadUserHistory(userId){
    let userData = loadHistory();
    return userData[userId];
}

// Сохранение всей истории в файл
function saveHistory(history){
    const data = JSON.stringify(history);
    fs.writeFileSync('history.json', data);
}

// Добавление нового вопроса в историю
function addToUserHistory(userId, query, response) {
    const history = loadHistory();
    let userHistory = history[userId];
    userHistory.push(createObject(query, response));
    saveHistory(history);
}

// Создание объекта вопрос с ответами.
function createObject(query, responses) {
    return {
        "query": query,
        "response": responses,
        "id": genId()
    };
}