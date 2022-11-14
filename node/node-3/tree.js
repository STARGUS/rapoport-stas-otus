"use strict";
//Дерево
class Tree {
  constructor(tree) {
    this.treeStructure = tree || {
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
  }
  //Функция показа дерева
  getTree(tree, prefix = "") {
    if (
      typeof tree == "object" &&
      tree.length > 0 &&
      typeof prefix == "string"
    ) {
      let result = "";
      tree.map((item, index) => {
        const lastSimbolActive = index === tree.length - 1;
        result +=
          prefix + (lastSimbolActive ? "└──" : "├──") + item.name + "\n";
        if (!!item.items)
          result += this.getTree(
            item.items,
            prefix + (lastSimbolActive ? "" : "|") + "   "
          );
      });
      return result;
    } else {
      throw "Ошибка! Ожидался массив со значениями name и префикс string";
    }
  }
  start(tree) {
    if (typeof tree == "object") {
      let dataTree = "";
      dataTree += tree.name + "\n";
      if (!!tree.items) {
        dataTree += this.getTree(tree.items);
      }
      return dataTree;
    } else {
      throw "Ошибка, на вход пришло значение: " + typeof tree;
    }
  }
  //Запуск
}
const startTree = new Tree();
startTree.start(startTree.treeStructure);
module.exports = Tree;
