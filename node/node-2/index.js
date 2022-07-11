const fs = require("fs");
const splittingIntoFiles = require("./splitting-into-fie");
const Transform = require("./transformer");

function createFileNumbers() {
  const maxLength = 100 * 1024 * 1024; // Максимальная длина файла
  const file = fs.createWriteStream("./numbers.txt"); // Файл для записи
  const writeFile = (chunk) => {
    //Запись в файл
    file.write(chunk, (err) => {
      if (err) {
        console.log("err");
      } else {
        pushNumber();
      }
    });
  };
  const pushNumber = () => {
    //Проверка, запись в Буфер и в файл
    let num = "";
    let numbers = [];
    while (true) {
      num += Math.floor(Math.random() * 10000000 + 1) + ",";
      if (num.length % (16* 1024) === 0) break;
    }
    let buffer = new Buffer(num);
    const resByteSize = file.bytesWritten + buffer.byteLength;
    if (resByteSize <= maxLength) {
      writeFile(buffer.toString() + ",");
    } else {
      if (maxLength - file.bytesWritten >= 8) {
        writeFile(Math.floor(Math.random() * 10000000 + 1) + ",");
      } else {
        if (maxLength - file.bytesWritten !== 0) {
          writeFile(
            Math.floor(
              Math.random() * Math.pow(10, maxLength - file.bytesWritten)
            ).toString()
          );
        } else {
          console.log(file.bytesWritten == maxLength);
          console.log(maxLength - file.bytesWritten);
          splittingIntoFiles(50);
        }
      }
    }
  };
  pushNumber();
}
createFileNumbers();
