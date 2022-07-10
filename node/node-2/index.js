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
    const num = [];
    for (let i = 0; i < 100; i++) {
      num.push(Math.floor(Math.random() * 10000000 + 1));
    }
    let buffer = new Buffer(num.join("\n"));
    const resByteSize = file.bytesWritten + buffer.byteLength;
    if (resByteSize <= maxLength) {
      writeFile(buffer.toString() + "\n");
    } else {
      if (maxLength - file.bytesWritten >= 8) {
        writeFile(Math.floor(Math.random() * 10000000 + 1) + "\n");
      } else {
        console.log(file.bytesWritten == maxLength);
        console.log(maxLength - file.bytesWritten);
        splittingIntoFiles(50);
      }
    }
  };
  pushNumber();
}
createFileNumbers();
