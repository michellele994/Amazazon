var inquirer = require("inquirer");
var consoleTable = require("console.table");
var mysql = require("mysql");
var results;
var departments = [];
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "mamazon"
});
connection.connect(function(err) {
	if (err) throw err;
	console.log("Howdy, boss!\n");
	departmentsAvailable();
	ask();
});
function ask() 
{
	inquirer.prompt([
	{
		type: "list",
		name: "action",
		message: "What would you like to do?",
		choices: ["View Products for Sale","View Low Inventory","Add to Inventory", "Add New Product", "Exit"]
	},
	{
		type: "input",
		name: "selectToAdd",
		message: "Type the item ID of the item you wish to update.",
		when: function(answer)
		{
			return answer.action === "Add to Inventory";
		}
	},
	{
		type: "input",
		name: "prodName",
		message: "What is the name of this new product?",
		when: function(answer)
		{
			return (answer.action === "Add New Product" && departments.length !== 0);
		}
	},
	{
		type: "list",
		name: "depName",
		message: "Which department does it belong to?",
		choices: departments,
		when: function(answer)
		{
			return (answer.action === "Add New Product" && departments.length !== 0);
		}
	},
	{
		type: "input",
		name: "price",
		message: "How much will it cost?",
		when: function(answer)
		{
			return (answer.action === "Add New Product" && departments.length !== 0);
		}
	},
	{
		type: "input",
		name: "amountToAdd",
		message: "How much would you like to add?",
		when: function(answer)
		{
			return (answer.action === "Add to Inventory" || (answer.action === "Add New Product" && departments.length !== 0));
		}
	}
	]).then(function(answer) {
		if(answer.action === "View Products for Sale")
		{
			readProducts();
		}
		else if(answer.action === "View Low Inventory")
		{
			showLowInventory();
		}
		else if(answer.action === "Add to Inventory")
		{
			connection.query("SELECT * FROM products", function(err, res) {
				if (err) throw err;
				results = res;

				if(doesIDExist(answer.selectToAdd) && answer.amountToAdd > 0 )
				{
					addToInventory(answer.amountToAdd, answer.selectToAdd);
				}
				else if(!doesIDExist(answer.selectToAdd))
				{
					console.log("That item ID currently does not exist. Click 'Add New Product' if you want to add something that doesn't currently exist");
					connection.end();
				}
				else if (answer.amountToAdd <= 0)
				{
					console.log("Please enter an amount that is greater than 0");
					connection.end();
				}
			});
		}
		else if(answer.action === "Add New Product")
		{
			connection.query("SELECT * FROM products", function(err, res) {
				if (err) throw err;
				results = res;
				if (departments.length === 0)
				{
					console.log("There are no current departments to add your products to. Please ask your Supervisor to add a department before adding products");
					connection.end();
				}
				else if(answer.price >= 0)
				{
					addNewProduct(answer.prodName, answer.depName, answer.price, answer.amountToAdd);
				}
			});
		}
		else if (answer.action === "Exit")
		{
			connection.end();
		}
	});
}
function readProducts()
{
	console.log("Selecting all products...\n");
	connection.query("SELECT * FROM products GROUP BY department_name", function(err, res) {
		if (err) throw err;
		results = res;
		if(results.length === 0)
		{
			console.log("There are no products!! Add some! \n")
		}
		else
		{
			console.table(res);
		}
		ask();
	});
}
function showLowInventory()
{
	console.log("Showing low inventory \n");
	connection.query("SELECT * FROM products", function(error, results) {
		if (error) throw error;
		if (results.length > 0)
		{
			connection.query("SELECT * FROM products WHERE stock_quantity < 5",
			function(err, res) {
				if (err) throw err;
				if(res.length === 0)
				{
					console.log("There are no products in low inventory. \n")
				}
				else
				{
					console.table(res);
				}
				ask();
			})
		}
		else if (results.length <=0)
		{
			console.log("There no products at all. Add some!")
		}
	})
}
function addToInventory(amount, product)
{
	console.log("Adding to inventory");
	var query = connection.query(
	"UPDATE products SET stock_quantity = stock_quantity +" +amount+"  WHERE ?",
	[
		{
			item_id: product
		}
	],
		function(err, res) {
			console.log("Items have been added!");
			ask();
		}
	);
}
function addNewProduct(prod_name, dep_name, price, quantity)
{
	console.log("Inserting a new product...\n");
	var query = connection.query(
		"INSERT INTO products SET ?",
		{
			product_name: prod_name,
			department_name: dep_name,
			price: price,
			stock_quantity: quantity,
			product_sales : 0
		},
		function(err, res) {
			console.log("New item has been added!!! Click View All Products to see it!\n")
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
function departmentsAvailable()
{
	var query = connection.query(
		"SELECT * FROM departments", function (err, res) {
			if(err) throw err;
			for (var i = 0; i < res.length; i++)
			{
				departments.push(res[i].department_name);
			}
			// ask();
		});
}