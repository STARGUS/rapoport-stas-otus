#!/usr/bin/env node
//shebang повзоляет указать интерпретатор в *nix
//Имя cli => cli-node-6
const commander = require("commander");
const { version, name } = require("./package.json");
const fs = require("fs");
const { prompt } = require("enquirer");
const chalk = require("chalk");

const editFileData = (name, value) => {
  const data = JSON.parse(fs.readFileSync("./data.json"));
  if (!!name && !!value) {
    data[name] = value;
    fs.writeFileSync("./data.json", JSON.stringify(data));
  }
  if (typeof name == "object") {
    fs.writeFileSync("./data.json", JSON.stringify(name));
  }
  return data;
};

commander
  .version("Версия текущего cli: " + version)
  .description("Мой первый CLI проект." + name);
commander
  .command("name <name>")
  .alias("n")
  .description("Задать имя пользователя")
  .action((name) => {
    editFileData("name", name);
    console.log("Ваше имя: " + name);
  });
commander
  .command("age <age>")
  .alias("a")
  .description("Задать возвраст")
  .action((age) => {
    editFileData("age", age);
    console.log("Ваш возраст: " + age);
  });
commander
  .command("addr <addr>")
  .description("Задать адрес пользователя")
  .action((addr) => {
    editFileData("address", addr);
    console.log("Ваш адрес проживая: " + addr);
  });
commander
  .option("--all | -a", "Вывести все данные о пользователе.")
  .action(() => {
    const data = editFileData();
    console.log(
      "Гражданин " +
        data.name +
        ", возраст: " +
        data.age +
        " лет, проживает по адресу: " +
        data.address +
        "."
    );
  });
commander
  .command("create")
  .action("crt")
  .description("Создание нового пользователя")
  .action((name, cmd) => {
    if (cmd.extension && !["json", "txt", "cfg"].includes(cmd.extension)) {
      console.log(chalk.red("\nExtension is not allowed."));
    } else {
      prompt([
        {
          type: "input",
          name: "name",
          message: "Укажите имя: ",
        },
        {
          type: "input",
          name: "age",
          message: "Укажите возраст: ",
        },
        {
          type: "input",
          name: "address",
          message: "Укажите адрес: ",
        },
      ]).then((options) => {
        editFileData(options);
        console.log(chalk.green(`\nPerson "${options.name}" created.`));
      });
    }
  });
commander.parse(process.argv);
