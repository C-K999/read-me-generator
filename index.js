const fs = require('fs');
const inquirer = require('inquirer');
const moment = require('moment');
const axios = require("axios");

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
        {
            type: 'input',
            message: 'Please pick an application license from the list (AGPL, GPL, LGPL, MPL, Apache, MIT, N/A).',
            name: 'license',
            choices: ['AGPL', 'GPL', 'LGPL', 'MPL', 'Apache', 'MIT', 'N/A'],
        },
        
        
    ])
    .then((response) => {
        var licenBadge;
        const readName = "jackie chun";
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
        var licenAme;
        var licenTxt = 'The '+licenAme+' is in effect here. Please click on the link for more information.';
        switch(response.license.toUpperCase()){
            case 'AGPL':
                licenBadge = "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
                licenAme = "[GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.en.html).";
                break;
            case 'GPL':
                licenBadge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
                licenAme = "[GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)"
                break;
            case 'LGPL':
                licenBadge = "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
                licenAme = "[GNU Lesser General Public License v3.0](https://www.gnu.org/licenses/lgpl-3.0.en.html)";
                break;
            case 'MPL':
                licenBadge = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
                licenAme = "[Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/)";
                break;
            case 'APACHE':
                licenBadge = "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
                licenAme = "[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)";
                break;
            case 'MIT':
                licenBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
                licenAme = "[MIT License](https://opensource.org/licenses/MIT)";
                break;
            case 'BSL':
                licenBadge = "[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
                licenAme = "[Boost Software License 1.0](https://www.boost.org/LICENSE_1_0.txt)";
                break;
            case 'N/A':
            case '':
            case ' ':
                licenBadge = "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
                licenTxt = "[Open source licenses does not apply to this software](https://unlicense.org/).";
                break;
            }
        
        const readLicen = '\n ## License\n'+ '\n'+licenTxt+'\n';
        
        const output = readTitle+readDesc+tableCont+readInstall+readUsage+licenTxt;

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