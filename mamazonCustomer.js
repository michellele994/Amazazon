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
	console.log("Howdy, valuable customer! Welcome to my shop.\n");
	//read and print the products
	readProducts();
	//It seems to take a while for this to happen, so I have made the ask function appear after 1second, after the table appears.
	setTimeout(function() {ask()},1000);
});
function ask()
{
	inquirer.prompt([
			{
				type: "input",
				name: "id",
				message: "What is the ID of the item that you would like to purchase?"
			},
			{
				type: "input",
				name: "quantity",
				message: "How much of it would you like to buy?"
			}
		]).then(function(answer) {
			var location = null;
			if(doesIDExist() && location !== null)
			{
				if(answer.quantity > 0)
				{
					if (answer.quantity <= results[location].stock_quantity)
					{
						updateProducts(answer.id, location, answer.quantity)
					}
					else
					{
						console.log("I don't think we have enough of that. Come back later!");
					}
				}
				else
				{
					console.log("I cannot read. Please use easy-to-read numbers");
				}
			}
			else
			{
				console.log("Sorry, I don't think we have any of that in stock. Try again!")
			}
			function doesIDExist()
			{
				for (var i = 0; i < results.length; i++)
				{
					if(answer.id == results[i].item_id)
					{
						location = i;
						return true;
						break;
					}
				}
			}
		});
}
function printCustomerTable(allProducts)
{
	var custAllProds = [];

	for (var i = 0; i < allProducts.length; i++)
	{
		var product = {
			item_id: allProducts[i].item_id,
			product_name: allProducts[i].product_name,
			department_name: allProducts[i].department_name,
			price: allProducts[i].price
		}
		custAllProds.push(product);
	}
	console.table(custAllProds);
}
function updateProducts(itemID, locInArray, changeInQuantity)
{
	console.log("Processing you request...\n");
	var query = connection.query(
		"UPDATE products SET stock_quantity = stock_quantity-"+changeInQuantity+" WHERE ?",
		[
			{
				item_id: itemID
			}
		],
		function(err, res) {
			connection.query("SELECT * FROM products", function(err, res) {
				if (err) throw err;
				results = res;
			});
			console.log("You got it! Your total purchase was $" + (results[locInArray].price*changeInQuantity) + " dollars");
			console.log("Thank you for shopping with Mamazon!");
		}
	);
	var query = connection.query(
		"UPDATE products SET product_sales = product_sales+"+results[locInArray].price*changeInQuantity+" WHERE ?",
		[{
			item_id: itemID
		}],
		function(err, res){
			connection.query("SELECT * FROM products", function(err, res) {
				if (err) throw err;
				results = res;
			});
		})
}
function readProducts(type) {
	console.log("Selecting all products...\n");
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		printCustomerTable(res);
		results = res;
	});
}