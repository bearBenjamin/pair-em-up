import { createElement } from "../utils.js";

function renderRulesScreen() {
    document.body.innerHTML = '';

    // header 
    const rulesTitle = createElement('h1', { className: 'main-rules-title' }, 'Правила');
    const header = createElement('header', { className: 'rules-header'}, rulesTitle);

    // main
    const textOne = createElement('p', { className: 'rules-text' }, 'Pair\'em Up - стратегическая игра по сопоставлению чисел. Цель - удалить все цифры с игрового поля, находя подходящие пары чисел.');
    const titleOne = createElement('h2', { className: 'rules-secondary-title' }, 'В игре три режима');
    const itemList1 = createElement('dt', {}, '-классический:');
    const itemList2 = createElement('dd', {}, 'числа от 1 до 19 (исключая 0) расположенные на игровом поле по порядку;');
    const itemList3 = createElement('dt', {}, '-случайный:');
    const itemList4 = createElement('dd', {}, 'числа от 1 до 19 (исключая 0) расположенные в случайном порядке;');
    const itemList5 = createElement('dt', {}, '-хаотичный:');
    const itemList6 = createElement('dd', {}, '27 случайных чисел от 1 до 9 расположенные на игровом поле в случайном порядке;');
    const itemsList1 = [itemList1, itemList2, itemList3, itemList4, itemList5, itemList6]
    const listOne = createElement('dl', { className: 'rules-game-study' }, ...itemsList1);

    const titleTwo = createElement('h2', { className: 'rules-secondary-title' }, 'Допустимые пары чисел');
    const itemListTwo1= createElement('li', {}, '-одинаковые числа (например 2 и 2);');
    const itemListTwo2 = createElement('li', {}, '-в сумме 10 (например 2 и 8, 4 и 6);');
    const itemListTwo3 = createElement('li', {}, '-особый случай - пара 5;');
    const listTwo = createElement('ul', { className: 'rules-pair' }, itemListTwo1, itemListTwo2, itemListTwo3);

    const titleThree = createElement('h2', { className: 'rules-secondary-title' }, 'Числа выбираются следующим образом');
    const itemListThree1 = createElement('dt', {}, '-смежные ячейки: ');
    const itemListThree2 = createElement('dd', {}, 'соседние числа по вертикали или горизонтали составляют допустимые пары;');
    const itemListThree3 = createElement('dt', {}, '-одна строка или столбец: ');
    const itemListThree4 = createElement('dd', {}, 'числа в одной строке или столбце могут быть объединены в пары, если ячейки между ними пустые;');
    const itemListThree5 = createElement('dt', {}, '-границы рядов: ');
    const itemListThree6 = createElement('dd', {}, 'последнее число одного ряда составляет допустимую пару с первым числом следующего ряда;');
    const listThree = createElement('dl', { className: 'rules-game-study' }, itemListThree1, itemListThree2, itemListThree3, itemListThree4, itemListThree5, itemListThree6);

    const titleFour = createElement('h2', { className: 'rules-secondary-title' }, 'Подсчет очков');
    const itemListFour1 = createElement('li', {}, '-одинаковые числа +1 балл;');
    const itemListFour2 = createElement('li', {}, '-в сумме 10 +2 балла;');
    const itemListFour3 = createElement('li', {}, '-особый случай +3 балла;');
    const listFour = createElement('ul', { className: 'rules-pair' }, itemListFour1, itemListFour2, itemListFour3);

    const titleFive = createElement('h2', { className: 'rules-secondary-title' }, 'Вспомогательные инструменты');
    const itemListFive1 = createElement('dt', {}, 'Подсказки (Hints):');
    const itemListFive2 = createElement('dd', {}, 'Показывают допустимые ходы (но не более 5) за один клик по кнопке. Всего за игру доступно 5 подсказок;');
    const itemListFive3 = createElement('dt', {}, 'Отменить (Backspace):');
    const itemListFive4 = createElement('dd', {}, 'Отмена последнего хода (можно использовать один раз в конце каждого хода);');
    const itemListFive5 = createElement('dt', {}, 'Добавление чисел (Add Numbers):');
    const itemListFive6 = createElement('dd', {}, 'Добавляет числа из игровой сетки по одному без пустых ячеек между ними. За игру доступно 5 добавлений;');
    const itemListFive7 = createElement('dt', {}, 'Перемешивание (Shuffle):');
    const itemListFive8 = createElement('dd', {}, 'Случайны образом перемешивает числа на игровом поле. За игру доступно 5 перемешиваний;');
    const itemListFive9 = createElement('dt', {}, 'Ластик (Eraser):');
    const itemListFive10 = createElement('dd', {}, 'Стирает любое число с игрового поля. За игру доступно 5 стираний;');
    const itemsListFive = [itemListFive1, itemListFive2, itemListFive3, itemListFive4, itemListFive5, itemListFive6, itemListFive7, itemListFive8, itemListFive9, itemListFive10];
    const listFive = createElement('dl', { className: 'rules-game-study' }, ...itemsListFive);

    const titleSix = createElement('h2', { className: 'rules-secondary-title' }, 'Условия победы / поражения');
    const itemListSix1 = createElement('li', {}, 'Условие победы - очистить игровое поле от чисел;');
    const itemListSix2 = createElement('li', {}, 'Условие поражения - не осталось ни одного допустимого хода и все вспомогательные инструменты были использованы;');
    const listSix = createElement('ul', { className: 'rules-pair' }, itemListSix1, itemListSix2);

    const containerMain = createElement('div', { className: 'rules-main-container' }, textOne, titleOne, listOne, titleTwo, listTwo, titleThree, listThree, titleFour, listFour, titleFive, listFive, titleSix, listSix);

    const main = createElement('main', { className: 'page-main' }, containerMain);

    // footer
    const backBtn = createElement('button', { className: 'btn btn-back-start' }, 'Back to Start');
    const footer = createElement("footer", { className: "game-footer" }, backBtn);

    // собираю и отрисовываю экран полностью
  const container = createElement("div", { className: "wrapper game-rulles" }, header, main, footer);

  document.body.append(container);
  //document.body.classList.add('rules');

}

export { renderRulesScreen };
