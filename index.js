const fs = require('fs');
const inquirer = require('inquirer');
const axios = require("axios");
const { table } = require('console');

inquirer
    .prompt([
        {
            type:'input',
            message:"What's the name of your project?",
            name: 'title',
        },
        {
            type: 'input',
            message: 'Please provide your project a description.',
            name: 'description',
        },
        {
            type: 'input',
            message: 'Please describe the installation process to serve as an instruction.',
            name: 'installation',
        },
        {
            type: 'input',
            message: 'Now, please provide usage information for your project.',
            name: 'usage',
        },
        
    ])
    .then((response) => {
        const filename  = response.title.split(' ').join('-')+".md";

        const readTitle = '# '+response.title+'\n';
        const readDesc = '\n'+response.description+'\n';
        const tableCont = '\n ## Table of Contents\n'+
                        '\n - [Installation](#installation)'+
                        '\n - [Usage](#usage)'+
                        '\n - [License](#license)'+
                        '\n - [Contributing](#contribute)'+
                        '\n - [Testing](#testing)'+
                        '\n - [Questions](#questions)\n'; 

        const readInstall = '\n ## Installation\n'+ '\n'+response.installation+'\n';
        const readUsage = '\n ## Usage\n'+ '\n'+response.usage+'\n';
        
        const output = readTitle+readDesc+tableCont+readInstall;

        console.log(output);
    })

//Prompts:

//Information on application repository

//Title - Displayed as title of README

//License - Added near top of README, which license covered under
//Contributing
//Tests
//Questions - Adds Github username with link to profile, and email

/* References
13-Ins_Read-Write-File
19-Ins_Inquirer-Demo
28-Ins_Axios-Demo
31-Stu_Mini-project*/