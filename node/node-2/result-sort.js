const fs = require("fs");
const { Sort } = require("./merge-sort");
async function resultSort(fileList) {
  const write = fs.createWriteStream("./result.txt", "utf8");
  const data = [];
  let i = 0;
  const readFiles = async () => {
    for await (const file of fileList) {
      const readFile = fs.createReadStream(file, {
        encoding: "utf8",
        highWaterMark: 128 * 1024,
        objectModel: true,
      });
      readFile.on("data", (chunk) => {
        data.push(...chunk.split("\n").map((el) => !!el && +el));
        i++;
        if (i % 50 == 0) {
          const reSort = Sort(data).filter((el) => !!el);
          write.write(reSort.join("\n") + "\n");
          data.length = 0;
        }
      });
    }
  };
  readFiles();
}

module.exports = resultSort;
