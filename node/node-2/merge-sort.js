const fs = require("fs");
const resultSort = require("./result-sort");

function mergeSort(num) {
  for (let i = 0; i < num; i++) {
    console.log("Старт ", i, " итерации");
    let Array = fs
      .readFileSync(`./file${i}.txt`, { encoding: "utf8" })
      .split(",");
     Array = Array.map((el) => +el).filter((el) => !!el);
    const newArray = Sort(Array);
    const writeFile = fs.createWriteStream(`./file${i}.txt`);
    writeFile.write(newArray.join(','), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Все идет ок!");
      }
    });
    if (i == num - 1) setTimeout(() => resultSort(num, Sort, merge), 1000);
  }
}
function merge(arrFirst, arrSecond) {
  const arrSort = [];
  let i = (j = 0);
  // сравниваем два массива, поочередно сдвигая указатели
  while (true) {
    if (i < arrFirst.length && j < arrSecond.length) {
      arrSort.push(arrFirst[i] < arrSecond[j] ? arrFirst[i++] : arrSecond[j++]);
    } else {
      break;
    }
  }
  // обрабатываем последний элемент при разной длине массивов
  // и возвращаем один отсортированный массив
  return [...arrSort, ...arrFirst.slice(i), ...arrSecond.slice(j)];
}
function Sort(arr) {
  // Проверяем корректность переданных данных
  if (!arr || !arr.length) {
    return null;
  }
  //Если массив содержит один элемент просто возвращаем его
  if (arr.length <= 1) {
    return arr;
  }
  // Находим середину массива и делим его на два
  const middle = Math.floor(arr.length / 2);
  const arrLeft = arr.slice(0, middle);
  const arrRight = arr.slice(middle);

  // Для новых массивов снова вызываем сортировку,
  // сливаем их и возвращаем снова единый массив
  return merge(Sort(arrLeft), Sort(arrRight));
}

module.exports = { mergeSort, Sort, merge };
