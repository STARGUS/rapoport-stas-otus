"use strict";
const Tree = {
  name: 1,
  items: [
    {
      name: 2,
      items: [{ name: 3 }, { name: 4 }],
    },
    {
      name: 5,
      items: [{ name: 6 }],
    },
  ],
};
//Функция показа дерева
function getTree(tree, prefix = "") {
  let result = "";
  tree.map((item, index) => {
    const lastSimbolActive = index === tree.length - 1;
    result += prefix + (lastSimbolActive ? "└──" : "├──") + item.name + "\n";
    if (!!item.items)
      result += getTree(
        item.items,
        prefix + (lastSimbolActive ? "" : "|") + "   "
      );
  });
  return result;
}
function start(tree) {
  let dataTree = "";
  dataTree += tree.name + "\n";
  if (!!tree.items) {
    dataTree += getTree(tree.items);
  }
  console.log(dataTree);
}
//Запуск
start(Tree);
