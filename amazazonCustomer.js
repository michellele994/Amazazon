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
	console.log("\nHowdy, valuable customer! Welcome to my shop.\n");
	//Upon connection, display the table
	readProducts();
});
function ask()
{
	inquirer.prompt([
			{
				type: "confirm",
				name: "confirm",
				message: "Would you like to buy something?",
				default: true
			},
			{
				type: "input",
				name: "id",
				message: "What is the ID of the item that you would like to purchase?",
				when: function(answer)
				{
					return answer.confirm === true;
				}
			},
			{
				type: "input",
				name: "quantity",
				message: "How much of it would you like to buy?",
				when: function(answer)
				{
					return answer.confirm === true;
				}
			}
		]).then(function(answer) {
			//location is used later to determine where in the array the item is placed, as itemID may not be reliable.
			var location = null;
			if (answer.confirm)
			{
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
							cl("I don't think we have enough of that. Come back later!");
							connection.end();
						}
					}
					else
					{
						cl("I cannot read very well. Please use easy-to-read numbers");
						ask();
					}
				}
				else
				{
					cl("Sorry, I don't think we have any of that in stock. Try again later!")
					connection.end();

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
			}
			else
			{
				cl("Okay, well come back when you want to buy something!");
				connection.end();
			}
		});
}
function readProducts() {
	console.log("\nHere's what we have...\n");
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		//stockAvail is used to check if there is any stock to start with.
		var stockAvail = false;
		results = res;
		for (var i = 0; i < results.length; i++)
		{
			if (results[i].stock_quantity > 0)
			{
				stockAvail=true;
				break;
			}
		}
		//If there is nothing in products, then relay that information to the customer.
		if (results.length === 0)
		{
			cl("It looks like we don't have anything to sell to you at this time. Please come back later!")
			connection.end();
		}
		//If there are items in the products table but stocks are all empty, then relay the information to the customer.
		else if (results.length > 0 && !stockAvail)
		{
			cl("We are sold out! Please come again later");
			connection.end();
		}
		else if (results.length > 0 && stockAvail)
		{
			printCustomerTable(res);
			ask();
		}
	});
}
//This function is used to only display the products without stock information, per assignment request.
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
	console.log("\nProcessing you request...\n");
	//Change the stock quantity to match how much the customer had bought
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
			cl("You got it! Your total purchase was $" + (results[locInArray].price*changeInQuantity) + " dollar(s).\nThank you for shopping with Amazazon!");
		}
	);
	//Change the product sales to reflect how much money the store has made for the product in total.
	var query = connection.query(
		"UPDATE products SET product_sales = product_sales+"+results[locInArray].price*changeInQuantity+" WHERE ?",
		[{
			item_id: itemID
		}],
		function(err, res){
			connection.query("SELECT * FROM products", function(err, res) {
				if (err) throw err;
				results = res;
				connection.end();
			});
		}
	);
}
//To prettify everything.
function cl(string)
{
	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n"+string+"\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}