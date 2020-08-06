// ==============================================================================
// DEPENDENCIES
// Node dependencies (npm packages) used for application/server functionality
// ==============================================================================

// * ----------------------------
const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");
// inquirer.registerPrompt("search-list", require("inquirer-search-list"));
const path = require("path");
const fs = require("fs");

// const DB = require("./db/db.js");
// const util = require("util");
// const writeFileAsync = util.promisify(fs.writeFile);
// const express = require("express");

const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "employees",
});

// LAUNCH FUNCTION ON CONNECT
connection.connect(function (err) {
  if (err) throw err;
  runApplication();
});

function runApplication() {
  console.log("Welcome to the HRD Employee Tracking & Administration Application");
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
        "Add Department",
        "Remove Department",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          viewAllEmp(); // DONE
          break;

        case "View All Employees By Department":
          viewEmpByDept(); // DONE
          break;

        case "View All Employees By Manager":
          viewEmpByMgr(); // DONE
          break;

        case "View All Employees By Role":
          viewEmpByRole(); // DONE
          break;

        case "Add Employee":
          addEmp(); // DONE
          break;

        case "Update Employee's Role":
          updateEmpRole(); // DONE
          break;

        case "Update Employee's Manager":
          updateEmpMgr(); // DONE
          break;

        case "Remove Employee":
          removeEmp(); // DONE
          break;

        case "View All Roles":
          viewAllRoles(); // DONE
          break;

        case "Add Role":
          addRole(); // DONE
          break;

        case "Remove Role":
          removeRole();
          break;

        case "View All Departments":
          viewAllDepts(); // DONE
          break;

        case "Add Department":
          addDept();
          break;

        case "Remove Department":
          removeDept();
          break;

        case "Exit":
          connection.end(); // DONE
          break;

        default:
          console.log("Not a valid selection."); // DONE
          break;
      }
    });
}

//! DONE -----------------------------------------------------
function viewAllEmp() {
  // Case 1: View All Employees
  // Return/reshow initial action list
  console.log(
    " ---------------------------------- \n ALL COMPANY EMPLOYEES AT THIS TIME \n ----------------------------------"
  );
  connection.query(
    "SELECT CONCAT(e.first_name, ' ', e.last_name) AS Employee, r.title AS Title, r.salary AS Salary, d.name AS Department, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'NONE') AS 'Manager' FROM employee e LEFT JOIN employee m ON m.id = e.manager_id LEFT JOIN role r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id ORDER BY e.last_name;",
    function (err, res) {
      if (err) throw err;
      let tableResults = [];
      for (var i = 0; i < res.length; i++) {
        var empObj = [res[i].Employee, res[i].Title, res[i].Salary, res[i].Department, res[i].Manager];
        tableResults.push(empObj);
      }

      console.table(["Employee", "Title", "Salary", "Department", "Manager"], tableResults);
      actions();
    }
  );
}
//! ----------------------------------------------------------
//! DONE -----------------------------------------------------
function viewEmpByDept() {
  // Case 2: View Employees X Dept.
  // loop through the employees table,
  // and display each employee (using console.table)
  // Return/reshow initial action list
  console.log(
    " ----------------------------------- \n ALL COMPANY EMPLOYEES BY DEPARTMENT \n -----------------------------------"
  );
  connection.query(
    "SELECT CONCAT(e.first_name, ' ', e.last_name) AS Employee, r.title AS Title, r.salary AS Salary, d.name AS Department, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'NONE') AS 'Manager' FROM employee e LEFT JOIN employee m ON m.id = e.manager_id LEFT JOIN role r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id ORDER BY d.name;",
    function (err, res) {
      if (err) throw err;
      let tableResults = [];
      for (var i = 0; i < res.length; i++) {
        var empObj = [res[i].Employee, res[i].Title, res[i].Salary, res[i].Department, res[i].Manager];
        tableResults.push(empObj);
      }

      console.table(["Employee", "Title", "Salary", "Department", "Manager"], tableResults);
      actions();
    }
  );
}
//! ----------------------------------------------------------
//! DONE -----------------------------------------------------
function viewEmpByMgr() {
  // Case 3: View Employees X Manager
  // loop through the employees table,
  // for each manager (if different from previous i), map the employees table...
  // and display the employee (using console.table)
  // Return/reshow initial action list
  console.log(
    " -------------------------------- \n ALL COMPANY EMPLOYEES BY MANAGER \n --------------------------------"
  );
  connection.query(
    "SELECT CONCAT(e.first_name, ' ', e.last_name) AS Employee, r.title AS Title, r.salary AS Salary, d.name AS Department, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'NONE') AS 'Manager' FROM employee e LEFT JOIN employee m ON m.id = e.manager_id LEFT JOIN role r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id ORDER BY m.last_name;",
    function (err, res) {
      if (err) throw err;
      let tableResults = [];
      for (var i = 0; i < res.length; i++) {
        var empObj = [res[i].Employee, res[i].Title, res[i].Salary, res[i].Department, res[i].Manager];
        tableResults.push(empObj);
      }

      console.table(["Employee", "Title", "Salary", "Department", "Manager"], tableResults);
      actions();
    }
  );
}
//! ----------------------------------------------------------
//! DONE -----------------------------------------------------
function viewEmpByRole() {
  // Case 4: View Employees X Role
  // loop through the roles table...
  // for each role, map the employees table
  // and display the employee (using console.table)
  // Return/reshow initial action list
  console.log(" ----------------------------- \n ALL COMPANY EMPLOYEES BY ROLE \n -----------------------------");
  connection.query(
    "SELECT CONCAT(e.first_name, ' ', e.last_name) AS Employee, r.title AS Title, r.salary AS Salary, d.name AS Department, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'NONE') AS 'Manager' FROM employee e LEFT JOIN employee m ON m.id = e.manager_id LEFT JOIN role r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id ORDER BY r.title;",
    function (err, res) {
      if (err) throw err;
      let tableResults = [];
      for (var i = 0; i < res.length; i++) {
        var empObj = [res[i].Employee, res[i].Title, res[i].Salary, res[i].Department, res[i].Manager];
        tableResults.push(empObj);
      }

      console.table(["Employee", "Title", "Salary", "Department", "Manager"], tableResults);
      actions();
    }
  );
}
//! ----------------------------------------------------------

//! DONE -----------------------------------------------------
function addEmp() {
  // Case 5: Add Employee
  // Use Inquirer (input) to ask first name of employee to add
  // Use Inquirer (input) to ask last name of employee to add
  // Use Inquirer (list) to display list of possible roles (all current)
  // Update the selected role on enter
  // Use Inquirer (list) to display list of potential employees to add as manager (all current)
  // Update the selected manager on enter
  // Use Inquirer (list) to display list of potential departments to add (all current)
  // Update the selected department on enter
  // Possibly show the completed employee that's added upon final selection (using console.table)
  // Return/reshow initial action list
  console.log(" -------------------------- \n ADD A NEW COMPANY EMPLOYEE \n --------------------------");
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
        .then((answers) => {
          let chosenMgrId;
          let chosenRoleId;
          // Setting chosenRoleId var to role_id that matches the title selected in list
          for (let i = 0; i < rolIdResults.length; i++) {
            if (rolIdResults[i].title == answers.selectRole) {
              chosenRoleId = rolIdResults[i].roleid;
            }
          }
          // Setting chosenMgrId var to employee_id that matches the employee selected in manager list
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
              console.log("New Employee successfully added!");
              actions();
            }
          );
        });
    }
  );
}
//! ----------------------------------------------------------

//! DONE -----------------------------------------------------
function updateEmpRole() {
  // Case 6: Update Employee's Role
  // Use inquire (list) to display current list of employees and ask which employee to update
  // console.log or in the message display the employee's current role.
  // Use inquire (list) to display list of roles (other than the already assigned role?)
  // Update the selected role on enter
  // Possibly show the completed employee that's updated upon final selection (using console.table)
  // Return/reshow initial action list
  console.log(
    " ------------------------------------------- \n UPDATE AN EXISTING EMPLOYEE'S ROLE OR TITLE \n -------------------------------------------"
  );
  connection.query(
    "SELECT CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', e.first_name, e.last_name, e.id AS 'empId', e.role_id, r.title AS 'Title', r.id AS 'Roleid' FROM employee e LEFT JOIN role r ON r.id = e.role_id",
    function (err, res) {
      if (err) throw err;
      const empResults = [];
      const empIdResults = [];
      const rolResults = [];
      const rolIdResults = [];
      for (let i = 0; i < res.length; i++) {
        // simply for CLI UI to display list of existing employees to choose to update
        let empObj = res[i].Employee;
        empResults.push(empObj);
        if (res[i].Title !== null) {
          // simply for CLI UI to display list of existing roles/titles to choose for selected employee
          let rolObj = res[i].Title;
          rolResults.push(rolObj);
          // for comparing inquirer selected title string and setting corresponding role id
          let rolIdObj = {
            title: res[i].Title,
            roleid: res[i].Roleid,
          };
          rolIdResults.push(rolIdObj);
        }
        // for comparing inquirer selected employee string to set role id to correct employee
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
            name: "selectRole",
            type: "list",
            message: "Select the role for this employee from the existing titles below.",
            choices: rolResults,
          },
        ])
        .then((answers) => {
          // get the information of the chosen item
          let chosenRoleId;
          let chosenEmpId;
          for (let i = 0; i < rolIdResults.length; i++) {
            if (rolIdResults[i].title == answers.selectRole) {
              chosenRoleId = rolIdResults[i].roleid;
            }
          }
          for (let i = 0; i < empIdResults.length; i++) {
            if (empIdResults[i].full == answers.selectEmployee) {
              chosenEmpId = empIdResults[i].empid;
            }
          }
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
              console.log("Role updated successfully!");
              actions();
            }
          );
        });
    }
  );
}
//! ----------------------------------------------------------

//! DONE -----------------------------------------------------
function updateEmpMgr() {
  // Case 7: Update Employee's Manager
  // Use inquire (list) to display current list of employees and ask which employee to update
  // console.log or in the message display the employee's current manager.
  // Use inquire (list) to display list of managers (other than the already assigned manager?)
  // Update the selected manager on enter
  // Possibly show the completed employee that's updated upon final selection (using console.table)
  // Return/reshow initial action list
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
              console.log("Manager updated successfully!");
              actions();
            }
          );
        });
    }
  );
}
//! ----------------------------------------------------------

//! DONE -----------------------------------------------------
function removeEmp() {
  // Case 9: Remove Employee
  // Use Inquire (list) to display current list of employees and ask which employee to remove.
  // Remove selected employee on enter...
  // Possibly use inquirer (confirm) to remove the employee:
  // if "yes" then remove the employee
  // if "no" then reshow the employee list
  // Possibly add "exit" to employee list...
  // Return/reshow initial action list
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
              console.log("Employee successfully deleted!");
              actions();
            }
          );
        });
    }
  );
}
//! ----------------------------------------------------------

//! DONE -----------------------------------------------------
function viewAllRoles() {
  // Case 10: View All Roles
  // Use Console.table? or simply console.log
  // Loop through roles table and display them in the console (possibly using console.table)
  // Return/reshow initial action list
  console.log(" ---------------------- \n VIEW ALL EXISTING ROLES \n ----------------------");
  connection.query(
    "SELECT r.title AS 'Title', r.salary AS 'Salary', r.department_id AS 'DepartmentId', d.name AS 'Department' FROM role r INNER JOIN department d ON d.id = r.department_id ORDER BY r.title;",
    function (err, res) {
      if (err) throw err;
      let tableResults = [];
      for (var i = 0; i < res.length; i++) {
        var roleObj = [res[i].Title, res[i].Salary, res[i].Department];
        tableResults.push(roleObj);
      }

      console.table(["Title", "Salary", "Department"], tableResults);
      actions();
    }
  );
}
//! ----------------------------------------------------------

//! DONE -----------------------------------------------------
function addRole() {
  // Case 11: Add Roles
  // Use Inquirer (input) to ask name of role to add
  // Possibly check to see if role requested for adding is in the roles table already or not
  // if already there, show validation message "Role already exists. Please add a new role."
  // Return/reshow initial action list
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
              console.log("New Role successfully added!");
              actions();
            }
          );
        });
    }
  );
}
//! ----------------------------------------------------------

function removeRole() {
  // Case 12: Remove Roles
  // Use Inquire (list) to display current list of roles and ask which role to remove.
  // Remove selected role on enter...
  // Possibly use inquirer (confirm) to remove the role:
  // if "yes" then remove the role
  // if "no" then reshow the role list
  // Possibly add "exit" to role list...
  console.log("Case 12: Remove Role");
  actions();
}

//! DONE -----------------------------------------------------
function viewAllDepts() {
  // Case 13: View All Departments
  // Use Console.table? or simply console.log
  // Loop through departments table and display them in the console
  console.log(
    " ------------------------------------ \n ALL COMPANY DEPARTMENTS AT THIS TIME \n ------------------------------------"
  );
  connection.query("SELECT d.name AS Department FROM department d ORDER BY d.name;", function (err, res) {
    if (err) throw err;
    let tableResults = [];
    for (var i = 0; i < res.length; i++) {
      var deptObj = [res[i].Department];
      tableResults.push(deptObj);
    }

    console.table(["Department"], tableResults);
    actions();
  });
}
//! ----------------------------------------------------------

function addDept() {
  // Case 14: Add Department
  // Use Inquirer (input) to ask name of department to add
  // Possibly check to see if department requested for adding is in the dept. list already or not:
  // if already there, show validation message "Department already exists. Please add a new department."
  // Return/reshow initial action list
  console.log("Case 14: Add Department");
  actions();
}

function removeDept() {
  // Case 15: Remove Department
  // Use Inquirer (list) to display current list of departments and ask which dept. to remove.
  // Remove selected department on enter...
  // Possibly use inquirer (confirm) to remove the department:
  // if "yes" then remove the department
  // if "no" then reshow the the department list
  // Possibly add "exit" to department list...
  console.log("Case 15: Remove Department");
  actions();
}
