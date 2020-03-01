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
function writeFile() {
    var createStream =  fs.createWriteStream("README.md");
     createStream.end();
     console.log(chalk.green("✅ README.md file created"));
     generateReadme();
     
    
  }

  

function generateReadme(){
    inquirer
    .prompt([
        {
            type: "input",
            name: "RepoName",
            message: "What is the name of your Project Repo",
            default: path.basename(process.cwd())
        },
        
        {
            type: "input",
            name : "projectVersion",
            message: "What is your Project Version (You can Press Enter To Skip)"
        },

        {
            input: "inpute",
            name: "projectDescription",
            message: "Enter Your Project Description",
            default: "This is a readme genereator command line application using node js"
        },

        {
            type: "input",
            name: "author",
            message: "Author name?",
            default: "Node Programmer"
        },

        {
            type: "input",
            name: "githubusername",
            message: "Please write your Github Username?"
        },

        {
            type: "input",
            name: "installCommand",
            message: "Install Command?"
        },

        {
            type: "input",
            name: "testCommand",
            message: "Test Command?"
        },

        {
            type: "list",
            name: "license",
            message: "License?",
            choices: [
                "MIT",
                "Eclipse",
                "Apache",
                "Mozilla",
                "ISC"
            ]
        },
        

    ])
    

    .then(answers => {
        inquirer
          .prompt([
            {
              type: "input",
              name: "license",
              message: "License name? (Press Enter to skip)"
            }
          ])

    .then(licenseAvailable => {
        let selectedChoice = "";
        if(answers.license === "MIT") {
        selectedChoice = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
          } 

        else if(answers.license === "ISC") { 
        selectedChoice = `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`;
          } 
          
        else if (answers === "Eclipse"){  
        selectedChoice = `[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)`;
          }

        else if (answers === "Apache"){  
        selectedChoice = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
          }

        else{  
        selectedChoice = `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)]`;
          }
        if (licenseAvailable.license) {
          
          inquirer
            .prompt([
              {
                type: "input",
                name: "licenseUrl",
                message: "License Url?",
                default: `https://github.com/${answers.githubusername}/${answers.projectName}/blob/master/LICENSE`
                
              }

              
              
            ])
            .then(licenseAvailableUrl => {
              
              
              
              fs.writeFileSync("README.md", `
# ${answers.RepoName}

${(answers.projectVersion) ? "![Project Version](https://img.shields.io/badge/Version-"+answers.projectVersion+"-blue)" : '' } ${(answers.projectHomepage) ? "![Documentation](https://img.shields.io/badge/Documentation-Yes-yellowgreen)" : '' } ![Maintained](https://img.shields.io/badge/Maintained-Yes-yellowgreen) ${(answers.twitterusername) ? "![Twitter Follow](https://img.shields.io/twitter/follow/"+answers.twitterusername+"?style=social)" : '' } ${(licenseAvailable.license) ? "![License](https://img.shields.io/badge/License-"+licenseAvailable.license+"-green)" : '' }

**${answers.projectDescription}**



${(answers.installCommand)? "## Install ":""}
${(answers.installCommand)? ""+answers.installCommand+"":""}



${(answers.testCommand)? "## Run Tests ":""}
${(answers.testCommand)? ""+answers.testCommand+"":""}

## Author
**${answers.author}**
${(answers.githubusername) ? '- Github : [@'+answers.githubusername+'](https://github.com/'+answers.githubusername+')': ''}


## Contributing
Issues, Feature requests are most welcomed!

## Show your support :pray:
Give a :star: or follow me if this project helped you.


${(licenseAvailable.license)? "## License ":""}
${(licenseAvailable.license)? ""+licenseAvailable.license+"":""}

${answers.license}: ${selectedChoice}
---

*This README was generated with :heart: by rd*

`)
            }).then(() => console.log("Now, you can check README.md, Hope you like it.💚"));
        }
      });
  
    
    });
    
 
}

    
           
