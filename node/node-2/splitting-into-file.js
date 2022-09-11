const fs = require("fs");
const { Sort = Function.prototype } = require("./merge-sort");
const resultSort = require("./result-sort");

async function splittingIntoFiles() {
  const maxSizeFileMbyte = 2 * 1024 * 1024;
  const read = fs.createReadStream("./numbers.txt", {
    encoding: "utf8",
    highWaterMark: maxSizeFileMbyte,
  });
  const numberOfFiles = Math.ceil(
    // Функция расчета нового количества файлов в зависимости от требуемой памяти
    fs.statSync("./numbers.txt").size / maxSizeFileMbyte
  );
  console.log("Количество необходимых файлов: ", numberOfFiles);
  let i = 0;
  let writeFile = fs.createWriteStream(`./file${i}.txt`);
  for await (const chunk of read) {
    const SortingFile = () => {
      const sortFile = Sort(
        chunk
          .replace("\n\n", "\n")
          .split("\n")
          .filter((el) => !!el)
      );
      writeFile.write(sortFile.join("\n") + "\n");
    };
    if (writeFile.bytesWritten <= 46 * 1024 * 1024 || i == 1) {
      SortingFile();
    } else {
      writeFile.end();
      i++;
      writeFile = fs.createWriteStream(`./file${i}.txt`);
      SortingFile();
    }
  }
  return resultSort(2);
}

module.exports = splittingIntoFiles;
