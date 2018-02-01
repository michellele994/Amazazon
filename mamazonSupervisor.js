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
					if(doesDepartmentExist(answer.depName))
					{
						console.log("\nThat department name already exists. Please choose a new name.\n");
						ask();
					}
					else if(!doesDepartmentExist(answer.depName))
					{
						console.log("Adding new department");
						addNewDepartment(answer.depName, answer.depCost);
					}
				});
			}
			else if(answer.action === "Exit")
			{
				connection.end();
			}
		});
}
function readProducts() {
	console.log("Selecting all products...\n");
	connection.query("SELECT departments.*, SUM(product_sales) AS product_sales, SUM(product_sales-over_head_costs) AS total_profit " +
		"FROM departments RIGHT JOIN products ON departments.department_name = products.department_name " +
		"GROUP BY departments.department_name ORDER BY department_id", function(err, res) {
		if (err) throw err;
		results = res;
		if(results.length === 0)
		{
			console.log("There are no departments! Add some!")
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
	console.log("Inserting a new department...\n");
	var query = connection.query(
		"INSERT INTO departments SET ?",
		{
			department_name: depName,
			over_head_costs: depCost
		},
		function(err, res) {
			console.log("New department has been added!!!")
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