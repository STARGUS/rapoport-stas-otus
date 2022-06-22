"use strict";
const tree = {
  name: 1,
  items: [
    {
      name: 2,
      items: [
        { name: 3 },
        { name: 4 },
        {
          name: 11,
          items: [{ name: 12 }, { name: 13 }],
        },
      ],
    },
    {
      name: 5,
      items: [{ name: 6 }],
    },
  ],
};

function getTree(tree, index, slip) {
  let newIndex = ++index;
  for (let [key, el] of tree.entries()) {
    if (!!el.items) {
      levelTree(el, newIndex);
    } else {
      if (key != tree.length - 1) {
        console.log(slip, " ├── ", el.name);
      } else {
        console.log(slip, " └── ", el.name);
      }
    }
  }
}
function levelTree(tree, index = 0) {
  let indexSlip = "";
  let major = "";
  for (let i = 0; i < index; i++) {
    indexSlip = indexSlip + "   ";
    if (i > 0) {
      major = major + "    ";
    }
  }
  if (index == 0) {
    console.log(tree.name);
  } else {
    // console.log(major, "├──", tree.name);
    console.log(major, "└──", tree.name);
  }
  if (!!tree.items) {
    getTree(tree.items, index, indexSlip);
  }
}

levelTree(tree);
