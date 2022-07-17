const tree = require("../tree");
const assert = require("assert");

describe("treeTests", () => {
  const treeStructure = {
    name: 2,
    items: [
      {
        name: 3,
        items: [{ name: 4, items: [{ name: 8 }] }, { name: 5 }],
      },
      {
        name: 6,
        items: [{ name: 7 }],
      },
    ],
  };
  it("modelTreeStructure#Static", () => {
    const treeTest = new tree();
    assert.deepStrictEqual(
      JSON.stringify(treeTest.treeStructure),
      JSON.stringify({
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
      })
    );
  });
  it("modelTreeStructure#Dynamic", () => {
    const tests = [
      { args: { name: 1, items: [{ name: 2 }] }, expected: `1\n└──2\n` },
      {
        args: { items: [{ name: 1, items: [{ name: 2 }, { name: 3 }] }] },
        expected: `\n├──1\n|   └──2\n`,
      },
      {
        args: treeStructure,
        expected: `2\n├──3\n|   ├──4\n|   |   └──8\n|   └──5\n└──6\n   └──7\n`,
      },
    ];
    tests.forEach(({ args, expected }) => {
      it(`correctly adds ${args.length} args`, function () {
        const res = new tree(args);
        assert.strictEqual(res, expected);
      });
    });
  });
  it("tree#start", () => {
    const newStart = new tree().start(treeStructure);
    assert.deepStrictEqual(
      newStart,
      `2\n├──3\n|   ├──4\n|   |   └──8\n|   └──5\n└──6\n   └──7\n`
    );
  });
  it("tree#startErr", () => {
    const test = new tree("Деверо");
    assert.throws(
      () => test.start(test.treeStructure),
      /Ошибка, на вход пришло значение: string/
    );
  });
  it("tree#getTree", () => {
    const test = new tree();
    assert.deepEqual(
      test.getTree(test.treeStructure["items"], "|   "),
      "|   ├──2\n|   |   ├──3\n|   |   └──4\n|   └──5\n|      └──6\n"
    );
    assert.deepEqual(
      test.getTree(test.treeStructure["items"], "**"),
      "**├──2\n**|   ├──3\n**|   └──4\n**└──5\n**   └──6\n"
    );
    assert.deepEqual(
      test.getTree(test.treeStructure["items"]),
      "├──2\n|   ├──3\n|   └──4\n└──5\n   └──6\n"
    );
  });
  it("tree#getTreeErr", () => {
    const test = new tree();
    assert.throws(() => test.getTree([{ name: 1 }, { name: 2 }], true));
    assert.throws(() => test.getTree("Дерево"));
  });
});
