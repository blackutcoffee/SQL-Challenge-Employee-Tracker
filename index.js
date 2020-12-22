const cTable = require("console.table");
const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("./tcp/connection.js")
const { prompt } = require("inquirer");
const logo = require("asciiart-logo");

require("console.table");


let departmentArray = [];
let departmentIdArray = [];
let employeeArray = [];
let employeeIdArray = [];
let roleArray = [];
let roleIdArray = [];
let managerArray = [];
let managerIdArray = [];

const menu = [
  "View all employees",
  "View employees by department",
  "View employees by manager",
  "Add employee",
  "Remove employee",
  "Update employee role",
  "Update employee manager",
  "Add manager",
  "Remove manager",
  "View roles",
  "Add role",
  "Remove role",
  "View departments",
  "Add department",
  "Remove department",
];
 roleArray = [
    "intern",
    "manager",
    "torts",
    "evidence",
    "civil pro",
    "due process",
    "subpeo",
    "barrister",
    "Remove manager",
    "View roles",
    "Add role",
    "Remove role",
    "View departments",
    "Add department",
    "Remove department",
  ];

  
  departmentArray = [
    "hr",
    "admin",
  "salesforce",
  "research adn development",
  "civil pro",
  "due process",
  "subpeo",
  "barrister",
  "Remove manager",
  "View roles",
  "Add role",
  "Remove role",
  "View departments",
  "Add department",
  "Remove department",
];
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("Connected as id " + connection.threadId);
});


const addDepartment = (data) => {
  connection.query(
    `INSERT INTO department (name) VALUES (?)`,
    [data.name],
    (err, rows) => {
      if (err) throw err;
      console.table(rows);
    }
  );
};


const addRole = (data) => {
  let department_id = departmentArray.indexOf(data.department) + 1;
  connection.query(
    `INSERT INTO role (title, department_id, salary) VALUES (?, ?, ?)`,
    [data.name, department_id, parseInt(data.salary)],
    (err, rows) => {
      if (err) throw err;
      console.table(rows);
    }
  );
};

const addEmployee = (data) => {
  let roleId = roleArray.indexOf(data.role) + 1;
  let managerId = managerArray.indexOf(data.manager) + 1;

  connection.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
    [data.first_name, data.last_name, roleId, managerId],
    (err, rows) => {
      if (err) throw err;
      console.table(rows);
    }
  );
};

addManager = function (answer) {
  let employeeId = employeeIdArray[employeeArray.indexOf(answer.name)];
  connection.query(
    "INSERT INTO manager (employee_id, manager) VALUES (?, ?)",
    [employeeId, answer.name],
    function (err, result) {
      if (err) throw err;
    }
  );
  console.log(answer.name + " Is A Manager!");
};


const getEmployees = () => {
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, 
    role.title, role.salary,
    manager.first_name AS manager_first, manager.last_name AS manager_last 
    FROM employee
    LEFT JOIN role
    ON employee.id = role_id
    LEFT JOIN manager
    ON employee.manager_id = manager.id`,
    (err, rows) => {
      if (err) throw err;
      console.table(rows);
    }
  );
};


getEmployeesByDepartment = function (answer) {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, manager.id FROM (((employee left join role on employee.role_id=role.id) left join department on role.department_id = department.id) left join manager on employee.manager_id=manager.id) where department.name = ? order by employee.id",
    [answer.name],
    function (err, result) {
      if (err) throw err;
      console.table(result);
    }
  );
};
getEmployeesByManager = function (answer) {
  connection.query(
    "SELECT manager.id FROM manager WHERE manager.id = ?",
    [answer.name],
    function (err, result) {
      if (err) throw err;
      connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, manager.id FROM (((employee left join role on employee.role_id=role.id) left join department on role.department_id = department.id) left join manager on employee.manager_id=manager.id) where employee.manager_id = ?",
        [result[0].id],
        function (err, result) {
          if (err) throw err;
          console.table(result);
        }
      );
    }
  );
};
updateEmployeeManager = function (answer) {
  let employeeId = employeeIdArray[employeeArray.indexOf(answer.name)];
  let managerId = managerIdArray[managerArray.indexOf(answer.manager) - 1];
  if (answer.manager == "null") {
    managerId = null;
  }
  connection.query(
    "UPDATE employee SET manager_id = ? WHERE id= ?",
    [managerId, employeeId],
    function (err, result) {
      if (err) throw err;
      else {
        console.log(answer.name + "'s Role Has Been Updated!");
      }
    }
  );
};
updateEmployeeRole = function (answer) {
  let employeeId = employeeIdArray[employeeArray.indexOf(answer.name)];
  let roleId = roleIdArray[roleArray.indexOf(answer.role)];
  connection.query(
    "UPDATE employee SET role_id = ? WHERE id= ?",
    [roleId, employeeId],
    function (err, result) {
      if (err) throw err;
      else {
        console.log(answer.name + "'s Role Has Been Updated!");
      }
    }
  );
};
removeEmployee = function (answer) {
  let employeeId = employeeIdArray[employeeArray.indexOf(answer.name)];
  connection.query(
    "DELETE FROM employee WHERE id= ?",
    [employeeId],
    function (err, result) {
      if (err) throw err;
      else {
        console.log(answer.name + " Has Been Removed From The Database!");
      }
    }
  );
};
removeRole = function (answer) {
  let roleId = roleIdArray[roleArray.indexOf(answer.name)];
  connection.query(
    "DELETE FROM role WHERE id = ?",
    [roleId],
    function (err, result) {
      if (err) throw err;
    }
  );
  console.log(answer.name + " Has Bee nRemoved From Roles.");
};
removeDepartment = function (answer) {
  let departmentId = departmentIdArray[departmentArray.indexOf(answer.name)];
  connection.query(
    "DELETE FROM department WHERE id = ?",
    [departmentId],
    function (err, result) {
      if (err) throw err;
    }
  );
  console.log(answer.name + " Has Been Removed From Departments.");
};
removeManager = function (answer) {
  let managerId = managerIdArray[managerArray.indexOf(answer.name)];
  connection.query(
    "DELETE FROM manager WHERE id = ?",
    [managerId],
    function (err, result) {
      if (err) throw err;
    }
  );
  console.log(answer.name + " Is No Longer A Manager.");
};
getRoles = function () {
  connection.query("SELECT * FROM role", function (err, result) {
    if (err) throw err;
    console.table(result);
    return result;
  });
};
getManagers = function () {
  connection.query(
    "SELECT employee.first_name, employee.first_name FROM employee INNER JOIN managers ON employee.id=manager.employee_id",
    function (err, result) {
      if (err) throw err;
      return result;
    }
  );
};
getDepartments = function () {
  connection.query("SELECT * FROM department", function (err, result) {
    if (err) throw err;
    console.table(result);
    return result;
  });
};
renderEmployees = function () {
  employeeArray = [];
  employeeIdArray = [];
  query = "select * from employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      employeeArray.push(`${res[i].first_name} ${res[i].last_name}`);
      employeeIdArray.push(res[i].id);
    }
  });
};
renderRoles = function () {
  roleArray = [];
  roleIdArray = [];
  query = "select * from role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
      roleIdArray.push(res[i].id);
    }
  });
};
renderDepartments = function () {
  departmentArray = [];
  departmentIdArray = [];
  query = "select * from department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      departmentArray.push(res[i].department);
      departmentIdArray.push(res[i].id);
    }
  });
};
renderManagers = function () {
  managerArray = ["null"];
  query = "select * from manager";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      managerArray.push(res[i].manager);
      managerIdArray.push(res[i].id);
    }
  });
};

async function mainPrompt() {
  return inquirer.prompt({
    type: "list",
    name: "choice",
    message: "What Would You Like To Do?",
    choices: menu,
  });
}
async function addDepartmentQuery() {
  return inquirer.prompt({
    type: "input",
    name: "name",
    message: "What Is The NAME Of The Department?",
  });
}
async function addRoleQuery() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What Is The TITLE of The Role?",
    },
    {
      type: "number",
      name: "salary",
      message: "What is the SALARY of the role?",
    },
    {
      type: "list",
      name: "department",
      message: "What DEPARTMENT does the ROLE belong to?",
      choices: departmentArray,
    },
  ]);
}
async function addManagerQuery() {
  return inquirer.prompt({
    type: "list",
    name: "name",
    message: "Which Employee Would You Like To Make A Manager?",
    choices: employeeArray,
  });
}




async function removeManagerQuery() {
  managerArray.shift();
  return inquirer.prompt({
    type: "list",
    name: "name",
    message: "Which Manager Would You Like To Remove?",
    choices: managerArray,
  });
}
async function addEmployeeQuery() {
  return inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the FIRST name of the employee?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the LAST name of the employee?",
    },
    {
      type: "list",
      name: "role",
      message: "What is the ROLE of the employee?",
      choices: roleArray,
    },
    {
      type: "list",
      name: "manager",
      message: "Who is the MANAGER of the employee?",
      choices: managerArray,
    },
  ]);
}
async function getByDepartmentQuery() {
  return inquirer.prompt({
    type: "list",
    name: "name",
    message: "Which DEPARTMENT would you like to view?",
    choices: departmentArray,
  });
}
async function getByManagerQuery() {
  managerArray.shift();
  return inquirer.prompt({
    type: "list",
    name: "name",
    message: "Which manager's employees would you like to view?",
    choices: managerArray,
  });
}
async function updateManagerQuery() {
  return inquirer.prompt([
    {
      type: "list",
      name: "name",
      message: "Which EMPLOYEE would you like to UPDATE?",
      choices: employeeArray,
    },
    {
      type: "list",
      name: "manager",
      message: "Which MANAGER would you like to ASSIGN?",
      choices: managerArray,
    },
  ]);
}
async function updateRoleQuery() {
  return inquirer.prompt([
    {
      type: "list",
      name: "name",
      message: "Which EMPLOYEE would you like to UPDATE?",
      choices: employeeArray,
    },
    {
      type: "list",
      name: "role",
      message: "Which ROLE would you like to asASSIGNsign?",
      choices: roleArray,
    },
  ]);
}
async function removeEmployeeQuery() {
  return inquirer.prompt({
    type: "list",
    name: "name",
    message: "Which EMPLOYEE would you like to REMOVE?",
    choices: employeeArray,
  });
}
async function removeRoleQuery() {
  return inquirer.prompt({
    type: "list",
    name: "name",
    message: "Which ROLE would you like to REMOVE?",
    choices: roleArray,
  });
}
async function removeDepartmentQuery() {
  return inquirer.prompt({
    type: "list",
    name: "name",
    message: "Which DEPARTMENT would you like to REMOVE?",
    choices: departmentArray,
  });
}
async function backToMain() {
  const backToMainPrompt = function () {
    return inquirer.prompt({
      type: "list",
      name: "response",
      message: "Would you like to Return To Main Menu?",
      choices: ["Yes", "No"],
    });
  };
  let backToMainResponse = await backToMainPrompt();
  if (backToMainResponse.response === "Yes") {
    init();
  } else {
    console.log("Your Changes Have Been Saved.  ADIOS!");
  }
}
async function init() {
    
//   renderEmployees();
//   renderRoles();
//   renderDepartments();
//   renderManagers();
  let first = await mainPrompt();
//   console.log(first)
  if (first.choice === menu[0]) {
    getEmployees();
  } else if (first.choice === menu[1]) {
    answer = await getByDepartmentQuery();
    getEmployeesByDepartment(answer);
  } else if (first.choice === menu[2]) {
    answer = await getByManagerQuery();
    getEmployeesByManager(answer);
  } else if (first.choice === menu[3]) {
    answer = await addEmployeeQuery();
    addEmployee(answer);
  } else if (first.choice === menu[4]) {
    answer = await removeEmployeeQuery();
    removeEmployee(answer);
  } else if (first.choice === menu[5]) {
    answer = await updateRoleQuery();
    updateEmployeeRole(answer);
  } else if (first.choice === menu[6]) {
    answer = await updateManagerQuery();
    updateEmployeeManager(answer);
  } else if (first.choice === menu[7]) {
    answer = await addManagerQuery();
    addManager(answer);
  } else if (first.choice === menu[8]) {
    answer = await removeManagerQuery();
    removeManager(answer);
  } else if (first.choice === menu[9]) {
    getRoles();
  } else if (first.choice === menu[10]) {
    answer = await addRoleQuery();
    addRole(answer);
  } else if (first.choice === menu[11]) {
    answer = await removeRoleQuery();
    removeRole(answer);
  } else if (first.choice === menu[12]) {
    getDepartments();
  } else if (first.choice === menu[13]) {
    answer = await addDepartmentQuery();
    addDepartment(answer);
  } else if (first.choice === menu[14]) {
    answer = await removeDepartmentQuery();
    removeDepartment(answer);
  }
  setTimeout(function () {
    backToMain();
  }, 5000);
}
init();