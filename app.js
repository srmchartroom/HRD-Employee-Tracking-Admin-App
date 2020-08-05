// ==============================================================================
// DEPENDENCIES
// Node dependencies (npm packages) used for application/server functionality
// ==============================================================================

// * ----------------------------
const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// const DB = require("./db/db.js");
// const util = require("util");
// const writeFileAsync = util.promisify(fs.writeFile);
// const express = require("express");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "top_songsDB",
});

// LAUNCH FUNCTION ON CONNECT
connection.connect(function (err) {
  if (err) throw err;
  runApplication();
});

function runApplication() {
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
        "Update Employee's Department",
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
        //! CASES THAT VIEW EMPLOYEES
        // Case 1: View All Employees
        case "View All Employees":
          viewAllEmp();
          break;
        // Case 2: View Employees X Dept.
        case "View All Employees By Department":
          viewEmpByDept();
          break;
        // Case 3: View Employees X Manager
        case "View All Employees By Manager":
          viewEmpByMgr();
          break;
        // Case 4: View Employees X Role
        case "View All Employees By Role":
          viewEmpByRole();
          break;
        //! CASES THAT CHANGE EMPLOYEE INFO
        // Case 5: Add Employee
        case "Add Employee":
          addEmp();
          break;
        // Case 6: Update Employee's Role
        case "Update Employee's Role":
          updateEmpRole();
          break;
        // Case 7: Update Employee's Manager
        case "Update Employee's Manager":
          updateEmpMgr();
          break;
        // Case 8: Update Employee's Department
        case "Update Employee's Department":
          updateEmpDept();
          break;
        // Case 9: Remove Employee
        case "Remove Employee":
          removeEmp();
          break;
        //! CASES THAT VIEW OR CHANGE ROLES LIST
        // Case 10: View All Roles
        case "View All Roles":
          viewAllRoles();
          break;
        // Case 11: Add Roles
        case "Add Role":
          addRole();
          break;
        // Case 12: Remove Roles
        case "Remove Role":
          removeRole();
          break;
        //! CASES THAT VIEW OR CHANGE DEPARTMENTS LIST
        // Case 13: View All Departments
        case "View All Departments":
          viewAllDepts();
          break;
        // Case 14: Add Department
        case "Add Department":
          addDept();
          break;
        // Case 15: Remove Department
        case "Remove Department":
          removeDept();
          break;
        //! CASES THAT VIEW OR CHANGE DEPARTMENTS LIST
        // Case 16: View All Departments
        case "Exit":
          connection.end();
          break;
      }
    });
}

function viewAllEmp() {
  // Case 1: View All Employees
  // Return/reshow initial action list
}

function viewEmpByDept() {
  // Case 2: View Employees X Dept.
  // loop through the employees table,
  // and display each employee (using console.table)
  // Return/reshow initial action list
}

function viewEmpByMgr() {
  // Case 3: View Employees X Manager
  // loop through the employees table,
  // for each manager (if different from previous i), map the employees table...
  // and display the employee (using console.table)
  // Return/reshow initial action list
}

function viewEmpByRole() {
  // Case 4: View Employees X Role
  // loop through the roles table...
  // for each role, map the employees table
  // and display the employee (using console.table)
  // Return/reshow initial action list
}

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
}

function updateEmpRole() {
  // Case 6: Update Employee's Role
  // Use inquire (list) to display current list of employees and ask which employee to update
  // console.log or in the message display the employee's current role.
  // Use inquire (list) to display list of roles (other than the already assigned role?)
  // Update the selected role on enter
  // Possibly show the completed employee that's updated upon final selection (using console.table)
  // Return/reshow initial action list
}

function updateEmpMgr() {
  // Case 7: Update Employee's Manager
  // Use inquire (list) to display current list of employees and ask which employee to update
  // console.log or in the message display the employee's current manager.
  // Use inquire (list) to display list of managers (other than the already assigned manager?)
  // Update the selected manager on enter
  // Possibly show the completed employee that's updated upon final selection (using console.table)
  // Return/reshow initial action list
}

function updateEmpDept() {
  // Case 8: Update Employee's Department
  // Use inquire (list) to display current list of employees and ask which employee to update
  // console.log or in the message display the employee's current dept.
  // Use inquire (list) to display list of departments (other than the already assigned dept?)
  // Update the selected department on enter
  // Possibly show the completed employee that's updated upon final selection (using console.table)
  // Return/reshow initial action list
}

function removeEmp() {
  // Case 9: Remove Employee
  // Use Inquire (list) to display current list of employees and ask which employee to remove.
  // Remove selected employee on enter...
  // Possibly use inquirer (confirm) to remove the employee:
  // if "yes" then remove the employee
  // if "no" then reshow the employee list
  // Possibly add "exit" to employee list...
  // Return/reshow initial action list
}

function viewAllRoles() {
  // Case 10: View All Roles
  // Use Console.table? or simply console.log
  // Loop through roles table and display them in the console (possibly using console.table)
  // Return/reshow initial action list
}

function addRole() {
  // Case 11: Add Roles
  // Use Inquirer (input) to ask name of role to add
  // Possibly check to see if role requested for adding is in the roles table already or not
  // if already there, show validation message "Role already exists. Please add a new role."
  // Return/reshow initial action list
}

function removeRole() {
  // Case 12: Remove Roles
  // Use Inquire (list) to display current list of roles and ask which role to remove.
  // Remove selected role on enter...
  // Possibly use inquirer (confirm) to remove the role:
  // if "yes" then remove the role
  // if "no" then reshow the role list
  // Possibly add "exit" to role list...
}

function viewAllDepts() {
  // Case 13: View All Departments
  // Use Console.table? or simply console.log
  // Loop through departments table and display them in the console
}

function addDept() {
  // Case 14: Add Department
  // Use Inquirer (input) to ask name of department to add
  // Possibly check to see if department requested for adding is in the dept. list already or not:
  // if already there, show validation message "Department already exists. Please add a new department."
  // Return/reshow initial action list
}

function removeDept() {
  // Case 15: Remove Department
  // Use Inquirer (list) to display current list of departments and ask which dept. to remove.
  // Remove selected department on enter...
  // Possibly use inquirer (confirm) to remove the department:
  // if "yes" then remove the department
  // if "no" then reshow the the department list
  // Possibly add "exit" to department list...
}

// function artistSearch() {
//    inquirer
//      .prompt({
//        name: "artist",
//        type: "input",
//        message: "What artist would you like to search for?",
//      })
//      .then(function (answer) {
//        var query = "SELECT position, song, year FROM top5000 WHERE ?";
//        connection.query(query, { artist: answer.artist }, function (err, res) {
//          if (err) throw err;
//          for (var i = 0; i < res.length; i++) {
//            console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
//          }
//          runSearch();
//        });
//      });
//  }

//  function multiSearch() {
//    var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//    connection.query(query, function (err, res) {
//      if (err) throw err;
//      for (var i = 0; i < res.length; i++) {
//        console.log(res[i].artist);
//      }
//      runSearch();
//    });
//  }

//  function rangeSearch() {
//    inquirer
//      .prompt([
//        {
//          name: "start",
//          type: "input",
//          message: "Enter starting position: ",
//          validate: function (value) {
//            if (isNaN(value) === false) {
//              return true;
//            }
//            return false;
//          },
//        },
//        {
//          name: "end",
//          type: "input",
//          message: "Enter ending position: ",
//          validate: function (value) {
//            if (isNaN(value) === false) {
//              return true;
//            }
//            return false;
//          },
//        },
//      ])
//      .then(function (answer) {
//        var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//        connection.query(query, [answer.start, answer.end], function (err, res) {
//          if (err) throw err;
//          for (var i = 0; i < res.length; i++) {
//            console.log(
//              "Position: " +
//                res[i].position +
//                " || Song: " +
//                res[i].song +
//                " || Artist: " +
//                res[i].artist +
//                " || Year: " +
//                res[i].year
//            );
//          }
//          runSearch();
//        });
//      });
//  }

//  function songSearch() {
//    inquirer
//      .prompt({
//        name: "song",
//        type: "input",
//        message: "What song would you like to look for?",
//      })
//      .then(function (answer) {
//        console.log(answer.song);
//        connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function (err, res) {
//          if (err) throw err;
//          console.log(
//            "Position: " +
//              res[0].position +
//              " || Song: " +
//              res[0].song +
//              " || Artist: " +
//              res[0].artist +
//              " || Year: " +
//              res[0].year
//          );
//          runSearch();
//        });
//      });
//  }

//  function songAndAlbumSearch {
//    inquirer.prompt({
//      name: "artist",
//      type: "input",
//      message: "What artist would you like to search for?"
//    }).then(function(answer) {
//      let query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist FROM top_albums INNER JOIN top5000 ON (top_albums.artist=top5000.artist) AND (top_albums.year=top_5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
//      connection.query(query) , [answer.artist, answer.artist], function (err, res) {
//        if (err) throw err;
//          console.log(
//            "Position: " +
//              res[0].position +
//
//              " || Year: " +
//              res[0].year
//
//              " || Album Position: " +
//              res[0].position
//
//              " || Artist: " +
//              res[0].artist
//
//              " || Song: " +
//              res[0].song +
//
//              " || Album: " +
//              res[0].album 0+
//
//          );
//      }
//    })
//  }
