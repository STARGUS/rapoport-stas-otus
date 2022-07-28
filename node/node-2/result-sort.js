const fs = require("fs");

function resultSort(num, Sort = Function.prototype) {
  let data = [];
  let file = [];
  const write = fs.createWriteStream("./result.txt");
  for (let i = 0; i < num - 1; i++) {
    if (i % 2 == 0) {
      file[i] = fs.createReadStream(`./fileRes${i}.txt`, {
        encoding: "utf8",
      });
      file[i + 1] = fs.createReadStream(`./file${i + 1}.txt`, {
        encoding: "utf8",
      });
      file[i]
        .on("data", (chunk) => {
          data[i] = chunk
            .split(",")
            .map((el) => +el)
            .filter((el) => !!el);
          file[i].pause();
        })
        .on("pause", () => file[i + 1].resume())
        .on("end", () => file[i + 1].resume())
        .on("close", () => file[i + 1].resume());
      file[i + 1]
        .on("data", (chunk) => {
          data[i + 1] = chunk
            .split(",")
            .map((el) => +el)
            .filter((el) => !!el);
          file[i + 1].pause();
        })
        .on("pause", () => startSort());
      const startSort = () => {
        let newData = [];
        if (!!data[i + 1] == false) {
          newData = data[i];
        } else {
          newData = Sort([...data[i], ...data[i + 1]]);
        }
        write.write(newData.toString(), (err) => {
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
