const fs = require("fs");
const splittingIntoFiles = require("./splitting-into-file");

module.exports = async function createFile(fileName) {
  const file = fs.createWriteStream(fileName, "utf8"); // Файл для записи
  const size = 100 * 1024 * 1024;
  const pushNumber = async () => {
    let num = "";
    //Формирование буфера для аписи
    while (true) {
      const number = Math.ceil(Math.random() * 10000000 + 1) + "\n";
      if (num.length + 8 <= 1024) {
        num += number;
      } else {
        num +=
          Math.ceil(Math.random() * Math.pow(10, 1024 - num.length - 1)) + "\n";
        break;
      }
    }
    return await num;
  };
  async function writeFile() {
    const num = await pushNumber();
    if (num.length !== 1024) {
      await writeFile();
    } else {
      await file.write(num, async (err) => {
        if (err) {
          console.log(err);
        } else {
          if (file.bytesWritten < size) {
            await writeFile();
          } else {
            return splittingIntoFiles();
          }
        }
      });
    }
  }
  await writeFile();
  if (file.bytesWritten === size) {
    return true;
  }
};
