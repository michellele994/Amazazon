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
	console.log("\nHowdy, boss!\n");
	departmentsAvailable();
});
function ask() 
{
	inquirer.prompt([
	{
		type: "list",
		name: "action",
		message: "Choose what you would like to do.",
		choices: ["View Products for Sale","View Low Inventory","Add to Inventory", "Add New Product", "Exit"]
	},
	{
		type: "input",
		name: "selectToAdd",
		message: "Type the item ID of the item you wish to update.",
		when: function(answer)
		{
				return (answer.action === "Add to Inventory");
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
			return((answer.action === "Add New Product" && departments.length !== 0) || answer.action === "Add to Inventory")
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
				else if(results.length <= 0)
				{
					cl("Boss! It looks like we don't have any products at all. Maybe you should add some!");
					ask();
				}
				else if(!doesIDExist(answer.selectToAdd) && results.length > 0)
				{
					cl("That item ID currently does not exist, boss! Try again later.");
					ask();
				}
				else if (answer.amountToAdd <= 0 && results.length > 0)
				{
					cl("Boss, you are confusing me. Please be more clear. Let's try this again.");
					ask();
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
					cl("Boss, there doesn't seem to be any departments open. Can you ask Big Boss about adding some departments?");
					connection.end();
				}
				else if(answer.price < 0 || answer.amountToAdd <= 0)
				{
					cl("Boss, you are confusing me. Please be more clear. Let's try this again.");
					ask();
				}
				else if(answer.price >= 0 && answer.amountToAdd > 0)
				{
					addNewProduct(answer.prodName, answer.depName, answer.price, answer.amountToAdd);
				}
			});
		}
		else if (answer.action === "Exit")
		{
			cl("See you later, boss!")
			connection.end();
		}
	});
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
			ask();
		});
}
function readProducts()
{
	console.log("\nHere's what we have...\n");
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		results = res;
		if(results.length === 0)
		{
			cl("Boss! It looks like we don't have anything at all. Maybe you should add some!");
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
	console.log("\nHere are the items that are low in stock... \n");
	connection.query("SELECT * FROM products", function(error, results) {
		if (error) throw error;
		if (results.length > 0)
		{
			connection.query("SELECT * FROM products WHERE stock_quantity < 5",
			function(err, res) {
				if (err) throw err;
				if(res.length === 0)
				{
					cl("We are adequately stocked, boss!")
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
			cl("Boss! It looks like we don't have anything at all. Maybe you should add some!");
			ask();
		}
	})
}
function addToInventory(amount, product)
{
	console.log("\nAdding to inventory...\n");
	var query = connection.query(
	"UPDATE products SET stock_quantity = stock_quantity +" +amount+"  WHERE ?",
	[
		{
			item_id: product
		}
	],
		function(err, res) {
			cl("Items have been added!");
			ask();
		}
	);
}
function addNewProduct(prod_name, dep_name, price, quantity)
{
	console.log("\nInserting a new product...\n");
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
			cl("New item has been added!!!")
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
function cl(string)
{
	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n"+string+"\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}