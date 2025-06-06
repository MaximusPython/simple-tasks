var num = 2;
console.log(num);
var man = {
    id: 1,
    age: 23,
    name: 'Kolya',
    firstname: 'Ivanov',
};
//=================================
var varibale = 20; // явная выводимая типизация
var variable = 3; // ts сам укажет тип
//=================================
// О Типах можно думать как о множествах
// обьединение Union | как логическое или
var data; // или число или строка
data = 22;
data = 'Ivan';
var info0 = { name: 'max', lastname: 'ivanov', age: 122 };
var info1 = { name: 'ivan', lastname: 'sergeev' };
var info2 = { age: 22 };
console.log(info0); // { name: 'max', lastname: 'ivanov', age: 122 }
console.log(info1); // { name: 'ivan', lastname: 'sergeev' }
console.log(info2); // { age: 22 }
var name0 = { name: 'vasya', lastname: 'petrov', age: 12 };
console.log(name0); // { name: 'vasya', lastname: 'petrov', age: 12 }
// тип у которого полей больше чем у другого типа может спокойно присваиваться (от больше к меньшеу работает)
// Т е обьект подтипа может быть присвоен переменной надтипа, наооборот уже нет
var subtype = { name: 'Vova', age: 25 };
var superType = subtype;
console.log(superType); // { name: 'Vova', age: 25 }
// ==================================
// const superType2: SuperType = { name: 'Vova' }
// const subType2: SybType = superType2
// console.log(subType2) // от меньшего к большему уже нельзя
// ==============================================
// Специальные типы
// ANY
var value;
value = 2;
value = {};
value = [];
function logData(data) {
    // указыаем тип явно чтоб не было красной полосы
    console.log(data);
}
// any являтся и супертипом и над типом
// ======================
// UNKNOWN
function logData2(data2) {
    var value2;
    if (typeof data2 === 'string') {
        value2 = data2;
    }
}
// unknown нужен когда мы незнаем какой тип ожидается на вход, мы делаем его неизвестным
// и потом за счет проверок безопасно его обработать
// unknown является супертипом но не может быть над типом
var value3;
value3 = 211;
value3 = 'hi';
value3 = true;
// работать так будет
// но так работать уже не будет так как unknown является супертипом и не может быть подтипом не для кого см ниже
// let value4: unknown
// let str2: string = value4
// ===============================
// NEVER
// противоположность unknown
// NEVER является подтипом для всех но не является надтипом (пустое множество то что не может сущестовать)
// тип NEVER используется в функции которая ошибку возращает или бесконечный цикл
var value5;
// let str3: string = value5 // never можно присвоить к любому типу
// let str4: string = '200'
// let value6: never = str4 // но присвоить другой тип для never уже нет
var Values;
(function (Values) {
    Values[Values["FIRST"] = 0] = "FIRST";
    Values[Values["SECOND"] = 1] = "SECOND";
    Values[Values["THIRD"] = 2] = "THIRD";
})(Values || (Values = {}));
function fn(value) {
    switch (value) {
        case Values.FIRST:
            return value;
        case Values.SECOND:
            return value;
        default:
            // const exhaustiveCheck: never = value // мы какбы защищакм чтоб никто не добавлял третье значение
            return value;
    }
}
console.log(fn(Values.FIRST)); // 0
console.log(fn(Values.SECOND)); // 1
// ===================================================
// VOID
// void означает что функция ничего не возвращает
function fn2() {
    // даже если функция ничего не возвращает по умолчанию функция все равно возращает undefined
    console.log();
}
var user5 = {
    address: {
        // В типе "{ coords: number[]; }" отсутствуют следующие свойства из типа "Address": city, streetts(2739)
        // чтобы это исправить нужно добавить в те поля знак ?
        coords: [222, 4],
    },
};
//-----------------------------------
var users = []; // если мы хотим обьявить массив юзеров то к типу мы добавляем квадратные скобки
var color = 'blue'; // другой цвет кроме троих назначенных мы передать уже не сможем
// получившийся тип с литералами мы можем передать например аргументом в функцию
var color2 = 'yellow';
function paint(color2) {
    return color2;
}
console.log(color2); // yellow
//-----------------------------------
var values7 = {
    color: 'green',
};
var responseFromUserApi = {
    data: {
        username: 'DATA',
    },
};
var responseFromArticleApi = {
    data: {
        title: 'volga',
    },
};
console.log(responseFromUserApi);
console.log(responseFromArticleApi);
