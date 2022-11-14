#!/usr/bin/env node
//shebang повзоляет указать интерпретатор в *nix
//Имя cli => cli-node-6
import { Command } from "commander";
const cli = new Command();
import { nameDto, ageDto, editFileDto, DataDto } from "./server.dto";
import { version, name } from "./package.json";
import * as fs from "fs/promises";
import { prompt } from "enquirer";
import chalk from "chalk";
import { join } from "path";

const editFileData = async (element: editFileDto) => {
  const data: DataDto = JSON.parse(
    await fs.readFile(join(__dirname, "data.json"), "utf8")
  );
  if (!!element.dataobj) {
    return await fs.writeFile("./data.json", JSON.stringify(element.dataobj));
  }
  if (!!element.name && !!element.value) {
    data[element.name] = element.value;
    return await fs.writeFile("./data.json", JSON.stringify(data));
  }
  return data;
};

cli["version"]("Версия текущего cli: " + version).description(
  "Мой первый CLI проект." + name
);
cli["command"]("name <name>")
  .alias("n")
  .description("Задать имя пользователя")
  .action((name: nameDto) => {
    editFileData({ name: "name", value: name });
    console.log("Ваше имя: " + name);
  });
cli["command"]("age <age>")
  .alias("a")
  .description("Задать возвраст")
  .action((age: ageDto) => {
    editFileData({ name: "age", value: age });
    console.log("Ваш возраст: " + age);
  });
cli["command"]("addr <addr>")
  .description("Задать адрес пользователя")
  .action((addr: string) => {
    editFileData({ name: "address", value: addr });
    console.log("Ваш адрес проживая: " + addr);
  });
cli["option"]("--all | -a", "Вывести все данные о пользователе.").action(
  async () => {
    const data = await editFileData({});
    !!data &&
      console.log(
        "Гражданин " +
          data.name +
          ", возраст: " +
          data.age +
          " лет, проживает по адресу: " +
          data.address +
          "."
      );
  }
);
cli["command"]("create")
  .alias("crt")
  .description("Создание нового пользователя")
  .action(async (name: string, cmd: object) => {
    const data: DataDto = await prompt([
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
    ]);
    await editFileData({
      dataobj: data,
    });
    return console.log(chalk.green(`\nPerson "${data["name"]}" created.`));
  });
cli["parse"](process.argv);
