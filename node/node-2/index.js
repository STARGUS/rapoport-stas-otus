const fs = require("fs");
const splittingIntoFiles = require("./splitting-into-fie");

function createFileNumbers(RAM) {
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
    let num = "";
    //Формирование буфера для записи
    while (true) { 
      num += Math.floor(Math.random() * 10000000 + 1) + ",";
      if (num.length % (2 * 1024) === 0) break;
    }
    const resByteSize = file.bytesWritten + num.length;
    if (resByteSize <= maxLength) { //Проверка размера конечного файла
      writeFile(num);
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
          splittingIntoFiles(RAM);
        }
      }
    }
  };
  pushNumber();
}
const [RAM] = process.execArgv.map(
  (el) => el.lastIndexOf("--max-old-space-size=") >= 0 && el.split("=")[1]
);
if (!!RAM && RAM >= 10) createFileNumbers(Number(RAM));
