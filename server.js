const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000; // Выберите подходящий порт

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const validKeys = new Set(); // Здесь будут храниться допустимые ключи

// Загрузка ключей из файла
fs.readFile('Authusers', 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка чтения файла:', err);
    return;
  }

  const keys = data.trim().split('\n');
  keys.forEach(key => validKeys.add(key));
  console.log('Загружены допустимые ключи:', validKeys);
});

app.post('/login', (req, res) => {
  const userKey = req.body.key;

  if (validKeys.has(`key-${userKey}-key`)) {
    res.send('Успешная аутентификация. Добро пожаловать!');
  } else {
    res.status(401).send('Ошибка аутентификации. Неверный ключ.');
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
