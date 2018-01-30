var inquirer = require("inquirer");
var consoleTable = require("console.table");
var mysql = require("mysql");
var results;
var choiceMade = false;
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
	ask();
});

function ask() 
{
	inquirer.prompt([
			{
				type: "list",
				name: "action",
				message: "What is it that you would like to do today?",
				choices: ["View Products for Sale","View Low Inventory","Add to Inventory", "Add New Product", "Exit"],
				when: function()
				{
					return !choiceMade;
				}
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
				name: "amountToAdd",
				message: "How much would you like to add?",
				when: function(answer)
				{
					return (doesIDExist(answer.selectToAdd));
				}
			}
		]).then(function(answer) {
			if(answer.action === "View Products for Sale")
			{
				choiceMade = true;
				readProducts();
				ask();
				choiceMade = false;
			}
			else if(answer.action === "View Low Inventory")
			{
				choiceMade = true;
				showLowInventory();
				ask();
				choiceMade = false;
			}
			else if(answer.action === "Add to Inventory")
			{
				choiceMade = true;
				if (doesIDExist(answer.selectToAdd))
				{
					console.log("Function works!")
				}
			}
		});
}

function readProducts()
{
	console.log("Selecting all products...\n");
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		results = res;
		console.table(results);
	});
}

function showLowInventory()
{
	console.log("Showing low inventory");
	connection.query("SELECT * FROM products WHERE stock_quantity < 5",
	function(err, res) {
		if (err) throw err;
		console.table(res);
		results = res;
	})
}
function addToInventory(amount, product)
{
	console.log("Adding to inventory");
	var query = connection.query(
	"UPDATE products SET ? WHERE ?",
	[
		{
			quantity: 100
		},
		{
			flavor: "Rocky Road"
		}
	],
		function(err, res) {
			console.log(res.affectedRows + " products updated!\n");
			// Call deleteProduct AFTER the UPDATE completes
			deleteProduct();
		}
	);

}
function doesIDExist(id)
{
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		results = res;
		for (var i = 0; i < results.length; i++)
		{
			if(id == results[i].item_id)
			{
				// location = i;
				return true;
				break;
			}
		}
	});
}