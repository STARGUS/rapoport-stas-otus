const fs = require("fs");
const mergeSort = require("./merge-sort");

function splittingIntoFiles(maxSizeFile) {
  const maxSizeFileMbyte = maxSizeFile * 1024 * 1024;
  const read = fs.createReadStream("./numbers.txt", "utf8");
  const numberOfFiles = Math.ceil(
    // Функция расчета нового количества файлов в зависимости от требуемой памяти
    fs.statSync("./numbers.txt").size / maxSizeFileMbyte
  );
  console.log("Количество необходимых файлов: ", numberOfFiles);
  let i = 0;
  let fileWrite = fs.createWriteStream(`./file${i}.txt`);
  read
    .on("data", (chunk) => {
      if (fileWrite.bytesWritten <= maxSizeFileMbyte) {
        fileWrite.write(chunk, (err) => {
          if (err) {
            console.log(err);
          } else {
            return;
          }
        });
      } else {
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
    .on("end", () => mergeSort(numberOfFiles));
}

module.exports = splittingIntoFiles;
