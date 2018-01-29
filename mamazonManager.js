var inquirer = require("inquirer");
var consoleTable = require("console.table");
var mysql = require("mysql");
var mamazon;

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "mamazon"
});


connection.connect(function(err) {
	if (err) throw err;
	// console.log("Howdy, valuable customer! Welcome to my shop.\n");

	//For some reason, requiring mamazon earlier does not work, probably with asynchronocity.
	mamazon = require("./mamazon.js");
	//read and print the products
	// mamazon.readProducts("manager");
	//It seems to take a while for this to happen, so I have made the ask function appear after 1second, after the table appears.
	// setTimeout(function() {ask()},1000);


});

module.exports = 
{
	mysql: mysql,
	connection: connection
}
