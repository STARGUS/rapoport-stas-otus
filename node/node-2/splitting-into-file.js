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
  const fileList = [];
  for await (const chunk of read) {
    fileName = `./files/file${i}.txt`;
    i++;
    const sortFile = Sort(
      chunk
        .replace("\n\n", "\n")
        .split("\n")
        .filter((el) => !!el)
    );
    fs.createWriteStream(fileName).write(sortFile.join("\n"));
    fileList.push(fileName);
  }
  return await resultSort(fileList);
}

module.exports = splittingIntoFiles;
