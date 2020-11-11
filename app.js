const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeQuestions = () =>
  inquirer.prompt
    ([
      {
        type: "list",
        name: "role",
        message: "What type of employee are you?",
        choices: ["manager", "engineer", "intern"]
      },
    ])

    .then((answers) => {
      if (answers.role === "manager") {
        return renderManager()
      } else if (answers.role === "intern") {
        return renderIntern()
      } else if (answers.role === "engineer") {
        return renderEngineer()
      }
      return (employeeQuestions.role);
    }).then(function (answers) {
      console.log(answers);
      writeHTML(outputPath, answers)
    });

employeeQuestions();
const employees = [];
const renderManager = (answers) => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "number",
      name: "id",
      message: "What is your employee ID number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is your office number?",
    },
    {
      type: "validate",
      name: "addEmployee",
      message: "Would you like to add another employee??",
    },

  ]).then(function (managerAnswers) {
    const manager = new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber);
    employees.push(manager);
    console.log(managerAnswers);
    if (managerAnswers.addEmployee === 'y') {
      return employeeQuestions();
    } else {
      return writeHTML();
    }
  });
};

const renderEngineer = () => {

  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "number",
      name: "id",
      message: "What is your employee ID number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?",
    },
    {
      type: "input",
      name: "github",
      message: "What is your github name?",
    },
    {
      type: "validate",
      name: "addEmployee",
      message: "Would you like to add another employee??",
    },

  ]).then(function (engineerAnswers) {
    const engineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.github);
    employees.push(engineer);
    console.log(engineerAnswers);
    if (engineerAnswers.addEmployee === 'y') {
      return employeeQuestions();
    } else {
      return writeHTML();
    }
  });
};

const renderIntern = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is your employee ID number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?",
    },
    {
      type: "input",
      name: "school",
      message: "Where did you or are you going to school?",
    },
    {
      type: "validate",
      name: "addEmployee",
      message: "Would you like to add another employee??",
    },

  ]).then(function (internAnswers) {
    const intern = new Intern(internAnswers.name, internAnswers.id, internAnswers.email, internAnswers.school);
    employees.push(intern);
    console.log(internAnswers);
    if (internAnswers.addEmployee === 'y') {
      return employeeQuestions();
    } else {
      return writeHTML();
    }
  });
};

function writeHTML() {
  fs.writeFile(outputPath, render(employees), null, function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("Successfully wrote the team!");
    }
  });
};