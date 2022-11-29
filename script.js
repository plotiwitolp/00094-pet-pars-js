// Набор уникальных внутренних адресов
let naborIN = new Set();
// Идентификатор таймера
let si;
// Счётчик
let counter = -1;

// Кастомный массив
const customArr = [];

let scaner = async () => {
  // Начало работы сканера. Первичный вызов.
  if (counter == -1) {
    naborIN.add(location.origin);
    counter += 1;
    return console.log('---Сканирование началось---');
  }
  // Условие окончания работы сканера
  if (counter >= [...naborIN].length) {
    clearInterval(si);
    return console.log('---Сканирование завершено---');
  }

  // Получение адреса для сканирования
  let scanURI = [...naborIN][counter];
  console.log(`Сканируется: ${scanURI}`);

  // Проверка для кастомного массива
  if (/https:\/\/pm.intervit.group\/product\//.test(scanURI)) {
    console.log('Дополнительное сканирование : ', scanURI);

    // Создание и добавление объекта с необходимых страниц
  }

  // Выборка строки HTML-разметки с сервера
  let str = await fetch(scanURI).then((resp) => resp.text());

  // Парсинг строки в DOM объект
  let scanDoc = new DOMParser().parseFromString(str, 'text/html');

  // все ссылки ("грязные")
  let arrHrefs = [...scanDoc.getElementsByTagName('a')].map((a) => a.href);

  // очистка "все ссылки, которые принадлежат текущему сайту"
  let aIN = arrHrefs.filter((i) => i.includes(location.origin));

  // очистка от "запросов и фрагментов"
  aIN.map((i) => i.replace(/\?.+/g, '').replace(/\#.+/g, '')).map((i) => naborIN.add(i));

  return (counter += 1);
};

// Вызов сканера
si = setInterval(scaner, 5000);
