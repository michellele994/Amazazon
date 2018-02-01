var inquirer = require("inquirer");
var consoleTable = require("console.table");
var mysql = require("mysql");
var results;
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "amazazon"
});
connection.connect(function(err) {
	if (err) throw err;
	console.log("\nHiya big boss!\n");
	ask();
});

function ask()
{
	inquirer.prompt([
		{
			type: "list",
			name: "action",
			message: "Choose what you would like to do.",
			choices: ["View Product Sales by Department", "Create New Department", "Exit"]
		},
		{
			type: "input",
			name: "depName",
			message: "What is the name for this new department?",
			when: function(answer)
			{
				return answer.action === "Create New Department";
			}
		},
		{
			type: "input",
			name: "depCost",
			message: "What is the over head cost for this department?",
			when: function(answer)
			{
				return answer.action === "Create New Department";
			}
		}]).then(function(answer) {
			if(answer.action === "View Product Sales by Department")
			{
				readDepartments();
			}
			else if(answer.action === "Create New Department")
			{
				connection.query("SELECT * FROM departments", function(err, res) {
					if (err) throw err;
					results = res;
					//Checks to see if department already exists
					if(doesDepartmentExist(answer.depName))
					{
						cl("\nThat department name already exists. Please choose a new name.\n");
						ask();
					}
					else if(!doesDepartmentExist(answer.depName))
					{
						addNewDepartment(answer.depName, answer.depCost);
					}
				});
			}
			else if(answer.action === "Exit")
			{
				cl("See you later, big boss!")
				connection.end();
			}
		});
}
function readDepartments() {
	console.log("\nHere are the departments...\n");
	//This here shows the table per the requirements of the homework instructions
	connection.query("SELECT departments.*, SUM(product_sales) AS product_sales, SUM(products.product_sales) - departments.over_head_costs AS total_profit " +
		"FROM departments RIGHT JOIN products ON departments.department_name = products.department_name " +
		"GROUP BY departments.department_name ORDER BY department_id", function(err, res) {
		if (err) throw err;
		results = res;
		if(results.length === 0)
		{
			cl("Heya Big Boss, looks like there are no departments. Let's add one.\n" +
				"If you had already created a department, there might be no products it.\n" +
				"Check with bos-- I mean, the store manager.");
		}
		else
		{
			console.table(res);
		}
		ask();
	});
}
function addNewDepartment(depName, depCost)
{
	console.log("\nAdding a new department...\n");
	var query = connection.query(
		"INSERT INTO departments SET ?",
		{
			department_name: depName,
			over_head_costs: depCost
		},
		function(err, res) {
			cl("New department has been added!!!")
			ask();
		}
	);
}
function doesIDExist(id)
{
	for (var i = 0; i < results.length; i++)
	{
		if(id == results[i].item_id)
		{
			return true;
			break;
		}
	}
}
function doesDepartmentExist(departmentName)
{
	for (var i = 0; i < results.length; i++)
	{
		if(departmentName.toUpperCase() === results[i].department_name.toUpperCase())
		{
			return true;
			break
		}
	}
}
function cl(string)
{
	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n"+string+"\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}