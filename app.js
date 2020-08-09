// DEPENDENCIES
// ----------------------------
const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");
const dotenv = require("dotenv").config();

// MYSQL DB CONNECTION
// ----------------------------
const connection = mysql.createConnection({
  // Your host location (replace "process.env.DB_HOST" with your host - e.g. typically "localhost")
  host: process.env.DB_HOST,
  // Your port; if not 3306
  port: 3306,
  // Your username (replace "process.env.DB_USER" with your username - root or otherwise)
  user: process.env.DB_USER,
  // Your password (replace "process.env.DB_PASS" with your password)
  password: process.env.DB_PASS,
  // Your database name
  database: "employees",
});

// LAUNCH FUNCTION ON CONNECT
// ----------------------------
connection.connect(function (err) {
  if (err) throw err;
  runApplication();
});

// Initial launch function
function runApplication() {
  // The console.logs below  are ASCII type for the title...
  console.log(
    ` ___  ___  ________  ________          _______   _____ ______   ________  ___       ________      ___    ___ _______   _______         `
  );
  console.log(
    `|\\  \\|\\  \\|\\   __  \\|\\   ___ \\        |\\  ___ \\ |\\   _ \\  _   \\|\\   __  \\|\\  \\     |\\   __  \\    |\\  \\  /  /|\\  ___ \\ |\\  ___ \\        `
  );
  console.log(
    `\\ \\  \\\\\\  \\ \\  \\|\\  \\ \\  \\_|\\ \\       \\ \\   __/|\\ \\  \\\\\\__\\ \\  \\ \\  \\|\\  \\ \\  \\    \\ \\  \\|\\  \\   \\ \\  \\/  / \\ \\   __/|\\ \\   __/|       `
  );
  console.log(
    ` \\ \\   __  \\ \\   _  _\\ \\  \\ \\\\ \\       \\ \\  \\_|/_\\ \\  \\\\|__| \\  \\ \\   ____\\ \\  \\    \\ \\  \\\\\\  \\   \\ \\    / / \\ \\  \\_|/_\\ \\  \\_|/__     `
  );
  console.log(
    `  \\ \\  \\ \\  \\ \\  \\\\  \\\\ \\  \\_\\\\ \\       \\ \\  \\_|\\ \\ \\  \\    \\ \\  \\ \\  \\___|\\ \\  \\____\\ \\  \\\\\\  \\   \\/  /  /   \\ \\  \\_|\\ \\ \\  \\_|\\ \\    `
  );
  console.log(
    `   \\ \\__\\ \\__\\ \\__\\\\ _\\\\ \\_______\\       \\ \\_______\\ \\__\\    \\ \\__\\ \\__\\    \\ \\_______\\ \\_______\\__/  / /      \\ \\_______\\ \\_______\\   `
  );
  console.log(
    `    \\|__|\\|__|\\|__|\\|__|\\|_______|        \\|_______|\\|__|     \\|__|\\|__|     \\|_______|\\|_______|\\___/ /        \\|_______|\\|_______|   `
  );
  console.log(
    `                                                                                                \\|___|/                                `
  );
  console.log(
    ` _________  ________  ________  ________  ___  __    ___  ________   ________              ________  ________  ________                `
  );
  console.log(
    `|\\___   ___|\\   __  \\|\\   __  \\|\\   ____\\|\\  \\|\\  \\ |\\  \\|\\   ___  \\|\\   ____\\            |\\   __  \\|\\   __  \\|\\   __  \\               `
  );
  console.log(
    `\\|___ \\  \\_\\ \\  \\|\\  \\ \\  \\|\\  \\ \\  \\___|\\ \\  \\/  /|\\ \\  \\ \\  \\\\ \\  \\ \\  \\___|            \\ \\  \\|\\  \\ \\  \\|\\  \\ \\  \\|\\  \\              `
  );
  console.log(
    `     \\ \\  \\ \\ \\   _  _\\ \\   __  \\ \\  \\    \\ \\   ___  \\ \\  \\ \\  \\\\ \\  \\ \\  \\  ___           \\ \\   __  \\ \\   ____\\ \\   ____\\             `
  );
  console.log(
    `      \\ \\  \\ \\ \\  \\\\  \\\\ \\  \\ \\  \\ \\  \\____\\ \\  \\\\ \\  \\ \\  \\ \\  \\\\ \\  \\ \\  \\|\\  \\           \\ \\  \\ \\  \\ \\  \\___|\\ \\  \\___|             `
  );
  console.log(
    `       \\ \\__\\ \\ \\__\\\\ _\\\\ \\__\\ \\__\\ \\_______\\ \\__\\\\ \\__\\ \\__\\ \\__\\\\ \\__\\ \\_______\\           \\ \\__\\ \\__\\ \\__\\    \\ \\__\\                `
  );
  console.log(
    `        \\|__|  \\|__|\\|__|\\|__|\\|__|\\|_______|\\|__| \\|__|\\|__|\\|__| \\|__|\\|_______|            \\|__|\\|__|\\|__|     \\|__|                `
  );
  console.log(
    `                                                                                                                                       `
  );
  console.log("Welcome to the HRD Employee Tracking & Administration Application");
  console.log(" ");

  actions();
}
// FUNCTION TO KICK OFF APPLICATION
function actions() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "View All Employees By Role",
        "Add Employee",
        "Update Employee's Role",
        "Update Employee's Manager",
        "Remove Employee",
        "View All Roles",
        "Add Role",
        "Remove Role",
        "View All Departments",
        "View Total Utilized Budget By Department",
        "Add Department",
        "Remove Department",
        "Exit",
      ],
    })
    // On selection in the terminal, evaluate the selection and run the appropriate function...
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          viewAllEmp();
          break;

        case "View All Employees By Department":
          viewEmpByDept();
          break;

        case "View All Employees By Manager":
          viewEmpByMgr();
          break;

        case "View All Employees By Role":
          viewEmpByRole();
          break;

        case "Add Employee":
          addEmp();
          break;

        case "Update Employee's Role":
          updateEmpRole();
          break;

        case "Update Employee's Manager":
          updateEmpMgr();
          break;

        case "Remove Employee":
          removeEmp();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "Remove Role":
          removeRole();
          break;

        case "View All Departments":
          viewAllDepts();
          break;

        case "Add Department":
          addDept();
          break;

        case "Remove Department":
          removeDept();
          break;

        case "View Total Utilized Budget By Department":
          viewBudget();
          break;

        case "Exit":
          console.log("GOODBYE!");
          //Exits application when "Exit" selected...
          connection.end();
          break;

        default:
          console.log("Not a valid selection.");
          break;
      }
    });
}

// FUNCTIONS BASED ON USER SELECTION
// ----------------------------------

// Runs when "View All Employees" is selected
function viewAllEmp() {
  // SQL query to the db
  connection.query(
    "SELECT CONCAT(e.first_name, ' ', e.last_name) AS Employee, r.title AS Title, r.salary AS Salary, d.name AS Department, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'NONE') AS 'Manager' FROM employee e LEFT JOIN employee m ON m.id = e.manager_id LEFT JOIN role r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id ORDER BY e.last_name;",
    function (err, res) {
      if (err) throw err;
      let tableResults = [];
      for (var i = 0; i < res.length; i++) {
        var empObj = [res[i].Employee, res[i].Title, res[i].Salary, res[i].Department, res[i].Manager];
        tableResults.push(empObj);
      }
      console.clear();
      console.log(
        " ---------------------------------- \n ALL COMPANY EMPLOYEES AT THIS TIME \n ----------------------------------"
      );
      console.table(["Employee", "Title", "Salary", "Department", "Manager"], tableResults);
      actions();
    }
  );
}

// Runs when "View All Employees By Department" is selected
function viewEmpByDept() {
  // SQL query to the db
  connection.query(
    "SELECT CONCAT(e.first_name, ' ', e.last_name) AS Employee, r.title AS Title, r.salary AS Salary, d.name AS Department, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'NONE') AS 'Manager' FROM employee e LEFT JOIN employee m ON m.id = e.manager_id LEFT JOIN role r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id ORDER BY d.name;",
    function (err, res) {
      if (err) throw err;
      let tableResults = [];
      for (var i = 0; i < res.length; i++) {
        var empObj = [res[i].Employee, res[i].Title, res[i].Salary, res[i].Department, res[i].Manager];
        tableResults.push(empObj);
      }
      console.clear();
      console.log(
        " ----------------------------------- \n ALL COMPANY EMPLOYEES BY DEPARTMENT \n -----------------------------------"
      );
      console.table(["Employee", "Title", "Salary", "Department", "Manager"], tableResults);
      actions();
    }
  );
}

// Runs when "View All Employees By Manager" is selected
function viewEmpByMgr() {
  // SQL query to the db
  connection.query(
    "SELECT CONCAT(e.first_name, ' ', e.last_name) AS Employee, r.title AS Title, r.salary AS Salary, d.name AS Department, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'NONE') AS 'Manager' FROM employee e LEFT JOIN employee m ON m.id = e.manager_id LEFT JOIN role r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id ORDER BY m.last_name;",
    function (err, res) {
      if (err) throw err;
      let tableResults = [];
      for (var i = 0; i < res.length; i++) {
        var empObj = [res[i].Employee, res[i].Title, res[i].Salary, res[i].Department, res[i].Manager];
        tableResults.push(empObj);
      }
      console.clear();
      console.log(
        " -------------------------------- \n ALL COMPANY EMPLOYEES BY MANAGER \n --------------------------------"
      );
      console.table(["Employee", "Title", "Salary", "Department", "Manager"], tableResults);
      actions();
    }
  );
}

// Runs when "View All Employees By Role" is selected
function viewEmpByRole() {
  // SQL query to the db
  connection.query(
    "SELECT CONCAT(e.first_name, ' ', e.last_name) AS Employee, r.title AS Title, r.salary AS Salary, d.name AS Department, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'NONE') AS 'Manager' FROM employee e LEFT JOIN employee m ON m.id = e.manager_id LEFT JOIN role r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id ORDER BY r.title;",
    function (err, res) {
      if (err) throw err;
      let tableResults = [];
      for (var i = 0; i < res.length; i++) {
        var empObj = [res[i].Employee, res[i].Title, res[i].Salary, res[i].Department, res[i].Manager];
        tableResults.push(empObj);
      }
      console.clear();
      console.log(" ----------------------------- \n ALL COMPANY EMPLOYEES BY ROLE \n -----------------------------");
      console.table(["Employee", "Title", "Salary", "Department", "Manager"], tableResults);
      actions();
    }
  );
}

// Runs when "Add Employee" is selected
function addEmp() {
  console.log(" -------------------------- \n ADD A NEW COMPANY EMPLOYEE \n --------------------------");
  // Initial SQL query so that role and manager can be selected from a list instead of user manually entering
  connection.query(
    "SELECT CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', e.first_name, e.last_name, e.id AS 'empId', e.role_id, r.title AS 'Title', r.id AS 'Roleid' FROM employee e INNER JOIN role r ON r.id = e.role_id",
    function (err, res) {
      if (err) throw err;
      const rolResults = [];
      const rolIdResults = [];
      const manResults = [];
      const manIdResults = [];
      for (let i = 0; i < res.length; i++) {
        // simply for CLI UI to display list of existing titles to choose role
        let rolObj = res[i].Title;
        rolResults.push(rolObj);
        // for comparing inquirer selected title string and setting corresponding role id
        let rolIdObj = {
          title: res[i].Title,
          roleid: res[i].Roleid,
        };
        rolIdResults.push(rolIdObj);
        // simply for CLI UI to display list of existing employee to choose a manager from
        let manObj = res[i].Employee;
        manResults.push(manObj);
        // for comparing inquirer selected manager name and setting corresponding manager id
        let manIdObj = {
          manid: res[i].empId,
          first: res[i].first_name,
          last: res[i].last_name,
          full: res[i].Employee,
        };
        manIdResults.push(manIdObj);
      }
      // simply to provide a final "None" option for the manager selection list in the CLI UI
      manResults.push("NONE");

      // Employee Entry question prompts
      inquirer
        .prompt([
          {
            name: "first",
            type: "input",
            message: "Enter employee's first name.",
          },
          {
            name: "last",
            type: "input",
            message: "Enter employee's last name.",
          },
          {
            name: "selectManager",
            type: "list",
            message: "Select the manager for this employee from the below.",
            choices: manResults,
          },
          {
            name: "selectRole",
            type: "list",
            message: "Select the role for this employee from the existing titles below.",
            choices: rolResults,
          },
        ])
        // asynchronous handling of the provided employee information
        .then((answers) => {
          let chosenMgrId;
          let chosenRoleId;
          // Setting chosenRoleId var to role_id that matches the title the user selected in list
          for (let i = 0; i < rolIdResults.length; i++) {
            if (rolIdResults[i].title == answers.selectRole) {
              chosenRoleId = rolIdResults[i].roleid;
            }
          }
          // Setting chosenMgrId var to employee_id that matches the employee the user selected in manager list
          if (answers.selectManager !== "NONE") {
            for (let i = 0; i < manIdResults.length; i++) {
              if (manIdResults[i].full == answers.selectManager) {
                chosenMgrId = manIdResults[i].manid;
              }
            }
            // Setting chosenMgrId to null if selected "NONE" in manager list
          } else {
            chosenMgrId = null;
          }
          // INSERT SQL to add the employee
          connection.query(
            "INSERT INTO employee SET ?",
            [
              {
                first_name: answers.first,
                last_name: answers.last,
                role_id: chosenRoleId,
                manager_id: chosenMgrId,
              },
            ],
            function (error) {
              if (error) throw err;
              console.clear();
              console.log("NEW EMPLOYEE ADDED SUCCESSFULLY!");
              actions();
            }
          );
        });
    }
  );
}

// Runs when "Update Employee's Role" is selected
function updateEmpRole() {
  console.log(
    " ------------------------------------------- \n UPDATE AN EXISTING EMPLOYEE'S ROLE OR TITLE \n -------------------------------------------"
  );
  // Var to hold the employee chosen
  let chosenEmpId;
  let chosenRoleId;
  // Initial db query to determine employee list and id
  connection.query(
    "SELECT CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', e.id AS 'empId', e.role_id, r.title AS 'Title', r.id AS 'Roleid' FROM employee e LEFT JOIN role r ON r.id = e.role_id",
    function (err, res) {
      if (err) throw err;
      const empResults = [];
      const empIdResults = [];

      for (let i = 0; i < res.length; i++) {
        // simply for CLI UI to display list of existing employees to choose to update
        let empObj = res[i].Employee;
        empResults.push(empObj);
        let empIdObj = {
          full: res[i].Employee,
          empid: res[i].empId,
        };
        empIdResults.push(empIdObj);
      }
      empResults.push("BACK TO MAIN MENU");
      inquirer
        .prompt([
          {
            name: "selectEmployee",
            type: "list",
            message: "Select the employee to update their role",
            choices: empResults,
          },
        ])
        .then((answers) => {
          if (answers.selectEmployee !== "BACK TO MAIN MENU") {
            for (let i = 0; i < empIdResults.length; i++) {
              if (empIdResults[i].full == answers.selectEmployee) {
                chosenEmpId = empIdResults[i].empid;
              }
            }
          } else {
            console.clear();
            actions();
          }
          connection.query("SELECT r.title AS 'Title', r.id AS 'Roleid' FROM role r", function (err, resp) {
            if (err) throw err;
            const rolResults = [];
            const rolIdResults = [];
            for (let i = 0; i < resp.length; i++) {
              if (resp[i].Title !== null) {
                // simply for CLI UI to display list of existing roles/titles to choose for selected employee
                let rolObj = resp[i].Title;
                rolResults.push(rolObj);
                // for comparing inquirer selected title string and setting corresponding role id
                let rolIdObj = {
                  title: resp[i].Title,
                  roleid: resp[i].Roleid,
                };
                rolIdResults.push(rolIdObj);
              }
            }
            rolResults.push("BACK TO MAIN MENU");
            // Employee Update question prompt
            inquirer
              .prompt([
                {
                  name: "selectRole",
                  type: "list",
                  message: "Select the role for this employee from the existing titles below.",
                  choices: rolResults,
                },
              ])
              .then((answer) => {
                // get the information of the chosen item
                for (let i = 0; i < rolIdResults.length; i++) {
                  if (rolIdResults[i].title == answer.selectRole) {
                    chosenRoleId = rolIdResults[i].roleid;
                  }
                }
                if (answers.selectRole !== "BACK TO MAIN MENU") {
                  connection.query(
                    "UPDATE employee SET ? WHERE ?",
                    [
                      {
                        role_id: chosenRoleId,
                      },
                      {
                        id: chosenEmpId,
                      },
                    ],
                    function (error) {
                      if (error) throw err;
                      console.clear();
                      console.log("ROLE UPDATED SUCCESSFULLY!");
                      actions();
                    }
                  );
                } else {
                  console.clear();
                  actions();
                }
              });
          });
        });
    }
  );
}

// Runs when "Update Employee's Manager" is selected
function updateEmpMgr() {
  console.log(
    " ------------------------------------- \n UPDATE AN EXISTING EMPLOYEE'S MANAGER \n -------------------------------------"
  );
  connection.query(
    "SELECT CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', e.id AS 'empId' FROM employee e",
    function (err, res) {
      if (err) throw err;
      const empResults = [];
      const empIdResults = [];
      for (let i = 0; i < res.length; i++) {
        // simply for CLI UI to display list of existing employees to choose to update
        let empObj = res[i].Employee;
        empResults.push(empObj);
        // for comparing inquirer selected employee string to set manager id to correct employee
        let empIdObj = {
          full: res[i].Employee,
          empid: res[i].empId,
        };
        empIdResults.push(empIdObj);
      }
      // Employee Update question prompts
      inquirer
        .prompt([
          {
            name: "selectEmployee",
            type: "list",
            message: "Select the employee to update their role",
            choices: empResults,
          },
          {
            name: "selectManager",
            type: "list",
            message: "Select the manager for this employee from the existing employees below.",
            choices: empResults,
          },
        ])
        .then((answers) => {
          // get the information of the chosen item
          let chosenMgrId;
          let chosenEmpId;
          for (let i = 0; i < empIdResults.length; i++) {
            if (empIdResults[i].full == answers.selectEmployee) {
              chosenEmpId = empIdResults[i].empid;
            }
          }
          for (let i = 0; i < empIdResults.length; i++) {
            if (empIdResults[i].full == answers.selectManager) {
              chosenMgrId = empIdResults[i].empid;
            }
          }
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                manager_id: chosenMgrId,
              },
              {
                id: chosenEmpId,
              },
            ],
            function (error) {
              if (error) throw err;
              console.clear();
              console.log("MANAGER UPDATED SUCCESSFULLY!");
              actions();
            }
          );
        });
    }
  );
}

// Runs when "Remove Employee" is selected
function removeEmp() {
  console.log(" --------------------------- \n REMOVE AN EXISTING EMPLOYEE \n ---------------------------");
  connection.query(
    "SELECT CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', e.id AS 'empId' FROM employee e",
    function (err, res) {
      if (err) throw err;
      const empResults = [];
      const empIdResults = [];
      for (let i = 0; i < res.length; i++) {
        // simply for CLI UI to display list of existing employees to choose to update
        let empObj = res[i].Employee;
        empResults.push(empObj);
        // for comparing inquirer selected employee string to set manager id to correct employee
        let empIdObj = {
          full: res[i].Employee,
          empid: res[i].empId,
        };
        empIdResults.push(empIdObj);
      }
      empResults.push("BACK TO MAIN MENU");
      // Employee Update question prompts
      inquirer
        .prompt([
          {
            name: "selectEmployee",
            type: "list",
            message: "Select the employee to delete",
            choices: empResults,
          },
        ])
        .then((answers) => {
          if (answers.selectEmployee !== "BACK TO MAIN MENU") {
            // get the information of the chosen item
            let chosenEmpId;
            for (let i = 0; i < empIdResults.length; i++) {
              if (empIdResults[i].full == answers.selectEmployee) {
                chosenEmpId = empIdResults[i].empid;
              }
            }
            for (let i = 0; i < empIdResults.length; i++) {
              if (empIdResults[i].full == answers.selectManager) {
                chosenMgrId = empIdResults[i].empid;
              }
            }
            connection.query(
              "DELETE FROM employee WHERE ?",
              {
                id: chosenEmpId,
              },
              function (error) {
                if (error) throw err;
                console.clear();
                console.log("EMPLOYEE REMOVED SUCCESSFULLY!");
                actions();
              }
            );
          } else {
            console.clear();
            actions();
          }
        });
    }
  );
}

// Runs when "View All Roles" is selected
function viewAllRoles() {
  connection.query(
    "SELECT r.title AS 'Title', r.salary AS 'Salary', r.department_id AS 'DepartmentId', d.name AS 'Department' FROM role r INNER JOIN department d ON d.id = r.department_id ORDER BY r.title;",
    function (err, res) {
      if (err) throw err;
      let tableResults = [];
      for (var i = 0; i < res.length; i++) {
        var roleObj = [res[i].Title, res[i].Salary, res[i].Department];
        tableResults.push(roleObj);
      }
      console.clear();
      console.log(" ---------------------- \n VIEW ALL EXISTING ROLES \n ----------------------");
      console.table(["Title", "Salary", "Department"], tableResults);
      actions();
    }
  );
}

// Runs when "Add Role" is selected
function addRole() {
  console.log(" ---------------- \n ADD A ROLE \n ----------------");
  connection.query(
    "SELECT r.title AS 'Title', r.id AS 'Id', r.department_id, d.id AS 'DeptId', d.name AS 'Department' FROM role r INNER JOIN department d ON d.id = r.department_id ORDER BY r.title;",
    function (err, res) {
      if (err) throw err;
      const depResults = [];
      const depIdResults = [];
      for (let i = 0; i < res.length; i++) {
        // simply for CLI UI to display list of existing employees to choose to update
        let depObj = res[i].Department;
        depResults.push(depObj);
        // for comparing inquirer selected employee string to set manager id to correct employee
        let depIdObj = {
          department: res[i].Department,
          deptid: res[i].DeptId,
        };
        depIdResults.push(depIdObj);
      }
      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "Enter the new job role's title.",
          },
          {
            name: "salary",
            type: "input",
            message: "Enter the annual base salary for the new role.",
          },
          {
            name: "department",
            type: "list",
            message: "Select the department to which this role belongs.",
            choices: depResults,
          },
        ])
        .then((answers) => {
          let chosenDepId;
          // Setting chosenDepId var to department_id that matches the department name selected
          for (let i = 0; i < depIdResults.length; i++) {
            if (depIdResults[i].department == answers.department) {
              chosenDepId = depIdResults[i].deptid;
            }
          }
          connection.query(
            "INSERT INTO role SET ?",
            [
              {
                title: answers.title,
                salary: answers.salary,
                department_id: chosenDepId,
              },
            ],
            function (error) {
              if (error) throw err;
              console.clear();
              console.log("NEW ROLE ADDED SUCCESSFULLY!");
              actions();
            }
          );
        });
    }
  );
}

// Runs when "Remove Role" is selected
function removeRole() {
  console.log(" ------------------ \n REMOVE ROLE \n ------------------");
  connection.query("SELECT r.title AS 'Title' FROM role r", function (err, res) {
    if (err) throw err;
    const rolResults = [];
    for (let i = 0; i < res.length; i++) {
      // simply for CLI UI to display list of existing employees to choose to update
      let rolObj = res[i].Title;
      rolResults.push(rolObj);
    }
    rolResults.push("BACK TO MAIN MENU");
    // Role delete question prompts
    inquirer
      .prompt([
        {
          name: "selectRole",
          type: "list",
          message: "Select the role to delete",
          choices: rolResults,
        },
      ])
      .then((answers) => {
        if (answers.selectRole !== "BACK TO MAIN MENU") {
          connection.query(
            "DELETE FROM role WHERE ?",
            {
              title: answers.selectRole,
            },
            function (error) {
              if (error) throw err;
              console.clear();
              console.log("ROLE REMOVED SUCCESSFULLY!");
              actions();
            }
          );
        } else {
          console.clear();
          actions();
        }
      });
  });
}

// Runs when "Remove Role" is selected
function viewAllDepts() {
  connection.query("SELECT d.name AS Department FROM department d ORDER BY d.name;", function (err, res) {
    if (err) throw err;
    let tableResults = [];
    for (var i = 0; i < res.length; i++) {
      var deptObj = [res[i].Department];
      tableResults.push(deptObj);
    }
    console.clear();
    console.log(
      " ------------------------------------ \n ALL COMPANY DEPARTMENTS AT THIS TIME \n ------------------------------------"
    );
    console.table(["Department"], tableResults);
    actions();
  });
}

// Runs when "Add Department" is selected
function addDept() {
  console.log(" ---------------- \n ADD A DEPARTMENT \n ----------------");
  inquirer
    .prompt([
      {
        name: "dep",
        type: "input",
        message: "Enter the name of the new department to add.",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO department SET ?",
        [
          {
            name: answers.dep,
          },
        ],
        function (error) {
          if (error) throw err;
          console.clear();
          console.log("NEW DEPARTMENT ADDED SUCCESSFULLY!");
          actions();
        }
      );
    });
}

// Runs when "Remove Department" is selected
function removeDept() {
  console.log(" ---------------- \n REMOVE A DEPARTMENT \n ----------------");
  connection.query("SELECT d.name AS 'Dept' FROM department d", function (err, res) {
    if (err) throw err;
    const depResults = [];
    for (let i = 0; i < res.length; i++) {
      // simply for CLI UI to display list of existing employees to choose to update
      let depObj = res[i].Dept;
      depResults.push(depObj);
    }
    depResults.push("BACK TO MAIN MENU");
    inquirer
      .prompt([
        {
          name: "selectDep",
          type: "list",
          message: "Select the department to delete",
          choices: depResults,
        },
      ])
      .then((answers) => {
        if (answers.selectDep !== "BACK TO MAIN MENU") {
          connection.query(
            "DELETE FROM department WHERE ?",
            {
              name: answers.selectDep,
            },
            function (error) {
              if (error) throw err;
              console.clear();
              console.log("DEPARTMENT REMOVED SUCCESSFULLY!");
              actions();
            }
          );
        } else {
          console.clear();
          actions();
        }
      });
  });
}

// Runs when "View Total Utilized Budget By Department" is selected
function viewBudget() {
  connection.query(
    "SELECT d.name AS 'Department', SUM(r.salary) AS 'Budget' FROM employee e INNER JOIN role r ON r.id = e.role_id INNER JOIN department d ON d.id = r.department_id GROUP BY Department;",
    function (err, res) {
      if (err) throw err;
      let tableResults = [];
      for (let i = 0; i < res.length; i++) {
        let empObj = [res[i].Department, res[i].Budget];
        tableResults.push(empObj);
      }
      console.clear();
      console.log(
        " ------------------------------------ \n ALL COMPANY DEPARTMENTS & BUDGET UTILIZED \n ------------------------------------"
      );
      console.table(["Department", "Budget"], tableResults);
      actions();
    }
  );
}
