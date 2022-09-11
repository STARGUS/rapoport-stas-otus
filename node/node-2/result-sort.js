const fs = require("fs");
const { Sort = Function.prototype } = require("./merge-sort");
function resultSort(num) {
  let data = [];
  let file = [];
  const write = fs.createWriteStream("./result.txt", {
    encoding: "utf8",
    highWaterMark: 2 * 1024 * 1024,
  });
  for (let i = 0; i < num - 1; i++) {
    if (i % 2 == 0) {
      file[i] = fs.createReadStream(`./file${i}.txt`, {
        encoding: "utf8",
        highWaterMark: 2 * 1024 * 1024,
      });
      file[i + 1] = fs.createReadStream(`./file${i + 1}.txt`, {
        encoding: "utf8",
        highWaterMark: 2 * 1024 * 1024,
      });
      file[i]
        .on("data", (chunk) => {
          data[i] = chunk.split("\n").map((el) => +el);
          file[i].pause();
        })
        .on("pause", () => file[i + 1].resume())
        .on("end", () => file[i + 1].resume())

      file[i + 1]
        .on("data", (chunk) => {
          data[i + 1] = chunk.split("\n").map((el) => !!el && +el);
          file[i + 1].pause();
        })
        .on("pause", () => startSort());
      const startSort = () => {
        let newData = Sort([...data[i], ...data[i + 1]]);
        write.write(newData.join("\n") + "\n", (err) => {
          if (err) {
            console.log(err);
          } else {
            data = [];
            file[i].resume();
          }
        });
      };
    }
  }
}

module.exports = resultSort;
