//modules that i am going to use to genarate a readme generator
//inquirer module is command line interactice user interface
//chalk module to color shell console output
//path module provides utilities for working with file and directory paths
//axios module will provide us the facility to make request to git hub api

const inquirer = require("inquirer");
const chalk = require("chalk");
const path = require("path");
const axios = require("axios");
const fs = require("fs");

//Below code will check will test synchronously whether or not the given path exist in the file system
const readmeExist = fs.existsSync("README.md");

//if exist ask user if user want to overwrite, otherwise close the application with a message
if(readmeExist){
    inquirer
    .prompt([
        {
            type: "confirm",
            name: "readmeExist",
            message: "README.md file already exist. Would you like to overwrite it. Hit y for YES and n for NO ",
            default: false
        }
    ])
    .then(answers =>{
        if(answers.readmeExist){
            writeFile();
        }
        else {
            console.log(chalk.red("Thank!!! Goodbye👋"));
        }
    });
}
else {
    writeFile();
}

function writeFile(){
    var createStream = fs.createWriteStream("README.md");
    createStream.end();
    console.log(chalk.green("✅ README.md file created"));
}
