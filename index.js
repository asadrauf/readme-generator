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

//if README.md exist ask CLI will ask user if user want to overwrite, otherwise close the application 
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

//if user want to overwrite existing README.md we will call writeFile Function
              writeFile();
          }
       
//If user dont want to overwrite will will close the application with Goodbye message          
      else 
          {
              console.log(chalk.red("Thank!!! Goodbye👋"));
          }
      });
     }
//Below is the writeFile function that will call generateReadme function once it create an empty README.md fie
      function writeFile() {
      var createStream =  fs.createWriteStream("README.md");
      createStream.end();
      console.log(chalk.green("✅ README.md file created"));
      generateReadme();  
    
      }
//generateReadme function that is using inquirer module to interact with the user
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

        {
            type: "input",
            name: "email",
            message: "Please provide your valid Email Address?",
        },

        {
            name: 'language',
            message: 'Programming Languages are used?',
            type: 'checkbox',
            default: 'node.js',
            choices: ['node.js', 'javascript', 'nodeModules']
        },

        {
            name: 'dependencies',
            message: 'Choose your project dependencies?',
            type: 'checkbox',
            default: 'inquirer', 
            choices: ['axios', 'chalk', 'prompt-checkbox']
        },

        {
            type: "input",
            name: "contributing",
            message: "Please provide a contributor name?",
        
        },
       ])
       .then(answers => {
        let selectedChoice = "";
        if(answers === "MIT") { selectedChoice = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
          } 

        else if(answers === "ISC") { selectedChoice = `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`;
          } 
          
        else if (answers === "Eclipse"){  selectedChoice = `[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)`;
          }

        else if (answers === "Apache"){  selectedChoice = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
          }

        else{  selectedChoice = `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)]`;
          }
//Calling an asynchronous requestInfo       
    requestInfo();
//ansynchronous function which sending https request to github api to retrieve the user github information
    async function requestInfo() {
    try {
        const { username } = await inquirer.prompt({
          type: "input",
          message: "Please Type your valid github username ",
          name: "username",
          default: "asadrauf"
        });

        const { data } = await axios.get(
          `https://api.github.com/users/${username}`
          
        );
          writeFile(username, data);
          
        } 
          catch (err) {
          console.log(err);
        }
          console.log(chalk.yellow("Now, you can check README.md, Hope you like it.💚"));
    }
                
        function writeFile(answer, user) {
        const embedIntoFile = fs.createWriteStream('README.md');
    
        //writing into the README.md file
        embedIntoFile.write( `
        # Command Line Application coded in Node js to generate a good README.md for github repo
            
# ${answers.RepoName} ![Maintained](https://img.shields.io/badge/readme-generator-yellowgreen) ![Maintained](https://img.shields.io/badge/UNC-bootCamp-blue)

## ${answers.language}
These are the programming languages that we used to built this good README.md file generator

${(answers.projectVersion) ? "![Project Version](https://img.shields.io/badge/Version-"+answers.projectVersion+"-blue)" : '' } ${(answers.projectHomepage) ? "![Documentation](https://img.shields.io/badge/Documentation-Yes-yellowgreen)" : '' } ![Maintained](https://img.shields.io/badge/Maintained-Yes-yellowgreen) ${(answers.twitterusername) ? "![Twitter Follow](https://img.shields.io/twitter/follow/"+answers.twitterusername+"?style=social)" : '' } ${(answers.license) ? "![License](https://img.shields.io/badge/License-"+answers.license+"-green)" : '' }

**${answers.projectDescription}**

${(answers.installCommand)? "## Install ":""} ![Maintained](https://img.shields.io/badge/npm-install-red)
${(answers.installCommand)? ""+answers.installCommand+"":""}
npm install will download a package and it's dependencies. npm install can be run with or without arguments. When run without arguments, npm install downloads dependencies defined in a package.json file and generates a node_modules folder with the installed modules

${(answers.testCommand)? "## Run Tests ":""} ![Maintained](https://img.shields.io/badge/npm-test-red)
${(answers.testCommand)? ""+answers.testCommand+"":""}
Writing tests for this project are still in process. We are using jest library to excetues our tests

## Author
**${answers.author}**
${(answers.githubusername) ? '- Github : [@'+answers.githubusername+'](https://github.com/'+answers.githubusername+')': ''}

${(answers.license)? "## License ":""}
${answers.license}: ${selectedChoice}
---
**${answers.dependencies}** [![devDependencies Status](https://david-dm.org/dwyl/hapi-auth-jwt2/dev-status.svg)](https://david-dm.org/dwyl/hapi-auth-jwt2?type=dev)
## Contributing
**${answers.contributing}**
Issues, Feature requests are most welcomed!. There are still issues and anyone can help to fixed the issues. Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Show your support :pray:
Give a :star: or follow me if this project helped you.
### Any suggestion or question are most welcome
<img src="${user.avatar_url}"  style="border-radius: 18px" width="30px" style = "border: 2px solid green" /> ${(answers.email) ? 'Email : ['+answers.email+']('+answers.githubusername+')': ''}

*This README was generated with :heart: by node js developer Asad Rauf*
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)


`)
         //write all markdown to the readme file close the create write stream
          embedIntoFile.end();
          };    
        });    
     }





    