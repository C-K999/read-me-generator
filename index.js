const fs = require('fs');
const inquirer = require('inquirer');
const moment = require('moment');
const axios = require("axios");

inquirer
    .prompt([
        {
            type:'input',
            message:"What's the name of your project?",
            name: 'title'
        },
        {
            type: 'input',
            message: 'Please provide your project a description.',
            name: 'description'
        },
        {
            type: 'input',
            message: 'Please describe the installation process to serve as an instruction.',
            name: 'installation'
        },
        {
            type: 'input',
            message: 'Now, please provide usage information for your project.',
            name: 'usage'
        },
        {
            type: 'input',
            message: 'Please pick an application license from the list (AGPL, GPL, LGPL, MPL, Apache, MIT, N/A).',
            name: 'license',
            choices: ['AGPL', 'GPL', 'LGPL', 'MPL', 'Apache', 'MIT', 'N/A']
        },
        {
            type: 'input',
            message: 'Next, please input your guidelines for potential contributions to your project.',
            name: 'contribution'
        },
        {
            type: 'input',
            message: 'Please provide instructions for testing.',
            name: 'test'
        },
        {
            message: "Enter your GitHub username",
            name: "username"
        },
        {
            type: 'input',
            message: "Last, but not least, please leave an email address when you need to be contacted.",
            name: "email"
        },
        
        
    ])
    .then((response) => {
               
        const queryUrl = `https://api.github.com/users/`+response.username;
        axios.get(queryUrl).then(function(res) {
            var licenBadge;
            var readName;
            const readGit = "https://github.com/"+response.username;

            const filename  = response.title.split(' ').join('-')+".md";

            const readTitle = '\n# '+response.title+'\n';
            const readDesc = '\n'+response.description+'\n';
            const tableCont = '\n## Table of Contents\n'+
                            '\n- [Installation](#installation)'+
                            '\n- [Usage](#usage)'+
                            '\n- [License](#license)'+
                            '\n- [Contribution](#contribution)'+
                            '\n- [Testing](#testing)'+
                            '\n- [Questions](#questions)\n'; 

            const readInstall = '\n## Installation\n'+ '\n'+response.installation+'\n';
            const readUsage = '\n## Usage\n'+ '\n'+response.usage+'\n';
            
            var licenTxt = "(Unknown licence, please implement it yourself.)";
            switch(response.license.toString().toUpperCase()){
                case 'AGPL':
                    licenBadge = "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
                    licenTxt = 'This operates under the [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.en.html). For more information, please click on the linked name.';
                    break;
                case 'GPL':
                    licenBadge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
                    licenTxt = 'This operates under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html). For more information, please click on the linked name.';
                    break;
                case 'LGPL':
                    licenBadge = "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
                    licenTxt = 'This operates under the [GNU Lesser General Public License v3.0](https://www.gnu.org/licenses/lgpl-3.0.en.html). For more information, please click on the linked name.';
                    break;
                case 'MPL':
                    licenBadge = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
                    licenTxt = 'This operates under the [Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/). For more information, please click on the linked name.';
                    break;
                case 'APACHE':
                    licenBadge = "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
                    licenTxt = 'This operates under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). For more information, please click on the linked name.';
                    break;
                case 'MIT':
                    licenBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
                    licenTxt = 'This operates under the [MIT License](https://opensource.org/licenses/MIT). For more information, please click on the linked name.';
                    break;
                case 'BSL':
                    licenBadge = "[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
                    licenTxt = 'This operates under the [Boost Software License 1.0](https://www.boost.org/LICENSE_1_0.txt). For more information, please click on the linked name.';
                    break;
                case 'N/A':
                case '':
                case ' ':
                case 'undefined':
                    licenBadge = "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
                    licenTxt = "[Open source licenses does not apply to this software](https://unlicense.org/).";
                    break;
                default:
                    licenTxt = "(Unknown licence, please implement it yourself.)"
            }

            const readLicen = '\n## License\n'+ '\n'+licenTxt+'\n';
            const readCont = '\n## Contribution\n'+ '\n'+response.contribution+'\n';
            const readTest = '\n## Testing\n'+ '\n'+response.test+'\n';

            readName = res.data.name;

            const readQuest = '\n## Questions\n'+'\nFor your inquiry, you may contact ['+readName+']('+readGit+') via email: ['+response.email+']('+response.email+').\n';

            const readFoot = '\n---\n'+'\n ©'+moment().format("YYYY")+' '+readName+'. All Rights Reserved.'

            const output = licenBadge+readTitle+readDesc+tableCont+readInstall+readUsage+readLicen+readCont+readTest+readQuest+readFoot;

            fs.writeFile(filename,output, (err) =>
                err ? console.error(err) : console.log ('Your README file has been printed.')
            )
        });

        
    })