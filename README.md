[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# employee-tracker
Title: ***Employee Tracker*** \
Developer: **Zackery Arsement** \
Deployment Date: 2/6/2022 \
For: UT JavaScript Coding Bootcamp

# Access Project

- ### [Github Repository](https://github.com/ZackeryArsement/noteTaker)
- ### [Walkthrough](https://watch.screencastify.com/v/EBGwQw924pGbHK30ln72)

# Table of Contents

-[Built-With](#built-with) \
-[Summary](#summary) \
-[Development](#development) \
-[Questions](#questions)

# Built-With

* [Javascript](https://javascript.com/)
* [Node.js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)

# Summary:

![Terminal Example](https://github.com/ZackeryArsement/employee-tracker/blob/main/assets/employee-tracker.png)

* The ***Employee Tracker*** provides the user with a work database.
* The user starts the aplication by inputting 'node server.js' into the integrated termal of Visual Studio Code.
* A prompt with a list of actions is then presented to the user to choose from.
* The user can select to view tables consisting of all departments, roles and employees within the database.
* The user can choose to add new departments, roles and employees into the database.
* The user can choose to update an employee's role or manager.

![Gif of Use](https://github.com/ZackeryArsement/employee-tracker/blob/main/assets/employee-tracker.gif)

# Development:

The ***Employee Tracker*** Application is intialized by typing 'node server.js' into the Visual Studio Integrated Terminal. With our server started the user is presented a list of questions in the form of a inquirer.prompt. When the user selects a prompt a switch case function is ran to determine which function to perform. In order for each function to run properly they are turned into 'async' functions and then followed with a function to re-display the initial prompts. This allows the user to choose their next actions. Within each async function there is a method called from the Database Class. These methods perform the 'msql2' actions we need performed in the database. In order for proper order and functionality to be met each database query call is turned into a 'promise'. This ensures each method and console.log is performed in the correct order.

# Questions

Email:
zarsement@hotmail.com