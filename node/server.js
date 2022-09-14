const fs = require("fs");
const createFile = require("./createFile");
const margeSort = (Function.prototype = require("./merge-sort"));

sortingFile100MB();
async function sortingFile100MB() {
  const NAMEFILE = __dirname + "/numbers.txt";
  await createFile(NAMEFILE);
}
