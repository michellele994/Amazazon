var inquirer = require("inquirer");
var consoleTable = require("console.table");
var mysql = require("mysql");
var results;
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "mamazon"
});
connection.connect(function(err) {
	if (err) throw err;
	console.log("Hiya big boss!\n");
	ask();
});

function ask()
{
	inquirer.prompt([
		{
			type: "list",
			name: "action",
			message: "What would you like to do today?",
			choices: ["View Product Sales by Department", "Create New Department"]
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
			message: "How much did this whole department cost?",
			when: function(answer)
			{
				return answer.action === "Create New Department";
			}
		}]).then(function(answer) {
			if(answer.action === "View Product Sales by Department")
			{
				readProducts();
			}
			else if(answer.action === "Create New Department")
			{
				connection.query("SELECT * FROM departments", function(err, res) {
					if (err) throw err;
					results = res;
				});
				setTimeout(function()
				{
					if(doesDepartmentExist(answer.depName))
					{
						console.log("That department name already exists. Please choose a new name.");
					}
					else if(!doesDepartmentExist(answer.depName))
					{
						console.log("Adding new department");
						addNewDepartment(answer.depName, answer.depCost);
					}
				},500);
			}
		});
}
function readProducts() {
	console.log("Selecting all products...\n");
	connection.query("SELECT * FROM departments", function(err, res) {
		if (err) throw err;
		results = res;
		if(results.length === 0)
		{
			console.log("There are no departments!")
		}
		else
		{
			console.table(res);
		}
	});
}
function addNewDepartment(depName, depCost)
{
	console.log("Inserting a new department...\n");
	var query = connection.query(
		"INSERT INTO departments SET ?",
		{
			department_name: depName,
			over_head_costs: depCost
		},
		function(err, res) {
			console.log("New item has been added!!! Click View All Products to see it!")
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