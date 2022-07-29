const fs = require("fs");
const { mergeSort = Function.prototype } = require("./merge-sort");

function splittingIntoFiles() {
  const maxSizeFileMbyte = 50 * 1024 * 1024;
  const read = fs.createReadStream("./numbers.txt", {
    encoding: "utf8",
    highWaterMark: 2* 1024,
  });
  const numberOfFiles = Math.ceil(
    // Функция расчета нового количества файлов в зависимости от требуемой памяти
    fs.statSync("./numbers.txt").size / maxSizeFileMbyte
  );
  console.log("Количество необходимых файлов: ", numberOfFiles);
  let i = 0;
  let fileWrite = fs.createWriteStream(`./file${i}.txt`);
  read
    .on("data", (chunk) => {
      if (fileWrite.bytesWritten + chunk.length <= maxSizeFileMbyte) {
        fileWrite.write(chunk, (err) => {
          if (err) {
            console.log(err);
          } else {
            return;
          }
        });
      } else {
        fileWrite.end();
        i++;
        fileWrite = fs.createWriteStream(`./file${i}.txt`);
        fileWrite.write(chunk, (err) => {
          if (err) {
            console.log(err);
          } else {
            return;
          }
        });
      }
    })
    .on("end", () => {
      mergeSort(numberOfFiles);
    });
}

module.exports = splittingIntoFiles;
