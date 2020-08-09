# HRD-Employee-Tracking-Admin-App &nbsp; ![](https://img.shields.io/badge/-Node.js-blue) ![](https://img.shields.io/badge/-ES6-red)

## Description

This application is a handy Node-based CLI application for querying employee information and updating it. It leverages `node.js` and standard ES6 `JavaScript`, and operates as a full CRUD application: pulls data from (READ), updates data in (UPDATE), adds new data to (CREATE), and deletes data (DELETE) from a mySQL `employees` database. This application is a handy way for internal ops and hr department staff to manage and update small staff operations (or big ones should they choose), internally from a command line application, much in the style of legacy-system applications. :)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [Credits](#credits)

## Installation

1. Download or clone this project and save it to your machine.
2. Create an emmployees database using the provided `HRD_DB_Setup.sql` file you can find in the repository's `Assets` directory.
3. Be sure to update the connection variables in the app.js file to those that are specific to you - including your host environment (most likely `localhost`), your db username (if run locally, most likely `root`), and of course your database password.
4. From Bash, Terminal, or whichever CLI you use, navigate to the directory where you've saved the application files.
5. Install the package.json with `npm install` or simply `npm i`.
6. Start the application from the command line by typing `node app.js`.
7. Start tracking and managing your employees in the application right from the command line!

## Usage

The below video provides an overview of the HRD Employee Tracking Admin application, the code involved and how it works, as well as a demo of the applicatio in action.

[![OVERVIEW: THE HRD EMPLOYEE TRACKING ADMIN APP IN ACTION](https://chartroomcreative.com/gitassets/HRD-Employee_Tracking-App.jpg)](https://chartroomcreative.com/gitassets/HRD-Employee_Tracking-App.mp4)

## License

Copyright (c) 2020 Sean McGinnis, Chart Room Creative LLC.

This project is provided under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

1. The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.
2. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   SOFTWARE.

## Contributing

To contribute, please follow the [Contributor Covenant](https://www.contributor-covenant.org/).

## Tests

Be sure to test the application after installation and deploying it. No jest-based automated tests or otherwise have been developed for this particular project. But successful execution can be quickly confirmed by simply running the application in the terminal by navigating to the directory you've saved the repository and executing: `node app.js`. To complete this, simply follow the installation instructions above. Additional context and instruction can be reviewed in the video provided above under [usage](#usage).

## Questions

For questions, please contact [sean@chartroomcreative.com](mailto:sean@chartroomcreative.com).

See srmchartroom(https://github.com/srmchartroom) for additional repositories and contact information.

## Credits

This project was developed without additional collaborators/contributors, but did make use of the node packages `MYSQL` and `INQUIRER` for connecting to the mySQL database and providing prompts in the CLI, respectively. If you'd like to contribute to this project, please see the [contributing](#contributing) section above.
