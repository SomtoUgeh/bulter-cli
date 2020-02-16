#!/usr/bin/env node
const inquirer = require("inquirer");
const { writeFileSync } = require("fs");

const jsConfig = require("./config/jsconfig.json");
const eslintConfig = require("./config/.eslintrc.json");
const prettierConfig = require("./config/.prettierrc.json");
const tsReactConfig = require("./config/tsconfig.react.json");
const tsReactNativeConfig = require("./config/tsconfig.react-native.json");

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
      name: "framework",
      message: "Pick the language you are using: ",
      choices: ["javaScript", "ts-react", "ts-react-native"]
    }
  ]);

  const cwd = process.cwd();

  writeFileSync(`${cwd}/.eslintrc`, JSON.stringify(eslintConfig, null, 2));
  writeFileSync(`${cwd}/.prettierrc`, JSON.stringify(prettierConfig, null, 2));
  writeFileSync(`${cwd}/.prettierignore`, prettierIgnoreContent);

  if (framework === "ts-react") {
    writeFileSync(`${cwd}/tsconfig.react.json`, JSON.stringify(tsReactConfig, null, 2));
  } else if (framework === "ts-react-native") {
    writeFileSync(
      `${cwd}/tsconfig.react-native.json`,
      JSON.stringify(tsReactNativeConfig, null, 2)
    );
  } else {
    writeFileSync(`${cwd}/jsconfig.json`, JSON.stringify(jsConfig, null, 2));
  }

  console.log(`${framework} defaults successfully created`);
})();
