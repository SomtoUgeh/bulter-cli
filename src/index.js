#!/usr/bin/env node
const inquirer = require("inquirer");
const { writeFileSync } = require("fs");

const eslintConfig = require("./config/.eslintrc.json");
const prettierConfig = require("./config/.prettierrc.json");
const jsConfig = require("./config/jsconfig.json");

const prettierIgnoreContent = `
dist
node_modules
coverage
build
docs
  `;

(async () => {
  const { framework } = await inquirer.prompt([
    {
      type: "list",
      message: "Pick the framework you are using: ",
      name: "framework",
      choices: ["react", "react-native"]
    }
  ]);

  const cwd = process.cwd();

  writeFileSync(`${cwd}/.eslintrc`, JSON.stringify(eslintConfig, null, 2));
  writeFileSync(`${cwd}/.prettierrc`, JSON.stringify(prettierConfig, null, 2));
  writeFileSync(`${cwd}/jsconfig.json`, JSON.stringify(jsConfig, null, 2));
  writeFileSync(`${cwd}/.prettierignore`, prettierIgnoreContent);

  console.log(`${framework} defaults successfully created`);
})();
