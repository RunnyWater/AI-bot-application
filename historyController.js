
// Загрузка всей истории из файла
function loadHistory(){
    const data = fs.readFileSync('history.json', 'utf8');
    return JSON.parse(data);
}

// Загрузка истории пользователя из файла
function loadUserHistory(userId){
    const userData = loadHistory();
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

// Создание уникального ID для вопроса
function genId(){}

// Вывод ответа (если нужно)
function handleRequest(query){

}

// Поиск вопроса по ID
function searchById(userId, requestId){
    const data = loadUserHistory(userId);
    for(let req of data){
        if(req.id == requestId)
            return req;
    }
}

// Поиск вопроса по Query
// **Примитивная версия, где найти вопрос можно только знав его точно**
function searchByQuery(userId, query){
    const data = loadUserHistory(userId);
    for(let req of data){
        if(req.query == query)
            return req;
    }
}