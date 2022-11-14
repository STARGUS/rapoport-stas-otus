function merge(arrFirst, arrSecond) {
  const arrSort = [];
  let i = (j = 0);
  // сравниваем два массива, поочередно сдвигая указатели
  while (true) {
    if (i < arrFirst.length && j < arrSecond.length) {
      arrSort.push(
        +arrFirst[i] < +arrSecond[j] ? +arrFirst[i++] : +arrSecond[j++]
      );
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

module.exports = { Sort, merge };
