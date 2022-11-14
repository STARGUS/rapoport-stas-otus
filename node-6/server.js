#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//shebang повзоляет указать интерпретатор в *nix
//Имя cli => cli-node-6
const commander_1 = require("commander");
const cli = new commander_1.Command();
const package_json_1 = require("./package.json");
const fs = __importStar(require("fs/promises"));
const enquirer_1 = require("enquirer");
const chalk_1 = __importDefault(require("chalk"));
const path_1 = require("path");
const editFileData = (element) => __awaiter(void 0, void 0, void 0, function* () {
    const data = JSON.parse(yield fs.readFile((0, path_1.join)(__dirname, "data.json"), "utf8"));
    if (!!element.dataobj) {
        return yield fs.writeFile("./data.json", JSON.stringify(element.dataobj));
    }
    if (!!element.name && !!element.value) {
        data[element.name] = element.value;
        return yield fs.writeFile("./data.json", JSON.stringify(data));
    }
    return data;
});
cli["version"]("Версия текущего cli: " + package_json_1.version).description("Мой первый CLI проект." + package_json_1.name);
cli["command"]("name <name>")
    .alias("n")
    .description("Задать имя пользователя")
    .action((name) => {
    editFileData({ name: "name", value: name });
    console.log("Ваше имя: " + name);
});
cli["command"]("age <age>")
    .alias("a")
    .description("Задать возвраст")
    .action((age) => {
    editFileData({ name: "age", value: age });
    console.log("Ваш возраст: " + age);
});
cli["command"]("addr <addr>")
    .description("Задать адрес пользователя")
    .action((addr) => {
    editFileData({ name: "address", value: addr });
    console.log("Ваш адрес проживая: " + addr);
});
cli["option"]("--all | -a", "Вывести все данные о пользователе.").action(() => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield editFileData({});
    !!data &&
        console.log("Гражданин " +
            data.name +
            ", возраст: " +
            data.age +
            " лет, проживает по адресу: " +
            data.address +
            ".");
}));
cli["command"]("create")
    .alias("crt")
    .description("Создание нового пользователя")
    .action((name, cmd) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, enquirer_1.prompt)([
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
    yield editFileData({
        dataobj: data,
    });
    return console.log(chalk_1.default.green(`\nPerson "${data["name"]}" created.`));
}));
cli["parse"](process.argv);
