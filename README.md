# Amazazon

## The application as a whole
**Supervisor**, **Manager**, and **Customer**. The purpose of this application is to recreate a simple version of an online store with a focus in using, displaying, and manipulating data in databases.
* The app consists of two tables, *products* and *departments*.
	* The *products* table consists of product_id, product_name, department_name, price, and stock_quantity.
	* The *departments* table consists of department_id, department_name, and over_head_costs 
	* The application starts off with completely empty tables.
* Each type of user has different types of actions.
	* The **Supervisor** is the only user who can view the departments table along with total product_sales and total_profit. The supervisor can also add new departments which then allows the manager to add products to the departments.
	* The **Manager** is in charge of monitoring stock_quantity, and is the only person who can view how much stock a product has. The manager is also in charge of updating stock quantity and adding new products when necessary.
	* The **Customer** is able to view and make purchases from the existing products. The Customer is unable to see stock_quantity, so sometimes the customer will be notified if the item that they have chosen has ran out of stock or does not currently exist.

### Supervisor View
amazazonSupervisor.js

* Because the app starts off with empty tables, the app should start with the creation of a department. At this time, the **Customer** and the **Manager** is unable to perform any action nor view any table due to the lack of departments (See video https://www.youtube.com/watch?v=09OcsVkMcEg).
* When creating a department, the Supervisor will be asked to provide the department_name and over_head_costs. *Currently the app does not calculate overhead costs per product, although this may be adjusted in the future*.
* After a department is created and products have been added, the Supervisor is able to view the department table along with total product_sales and total_profit, so that the supervisor can see how much money is being made per department at ease.

### Manager View
amazazonManager.js

* Because the app starts off with empty tables, there will be no products or departments. The Manager is unable to perform any action unless a department exists through the **Supervisor**.
* Before a product is added, the Manager is unable to view the products table as it does not exist until a product is added to a department.
* After a department has been created, the Manager will have the ability to add products to the department. Adding a product will prompt the supervisor for product_name, department_name(choosing from existing departments), price, and stock_quantity.
* After a product has been created, Manager and **Customer** will be able to see the existing products for sale.
* The Manager is also able to view Low Inventory products, products with less than a certain amount in stock. This will assist the Manager's job in restocking when needed.

### Customer View
amazazonCustomer.js

* If a customer is attempting to shop when no departments or products have been created, the customer will be turned away and notified that there are currently no products for sale. This same thing will happen if a department has been created but no products have been added by the **Manager**. If there are departments and products, if all the products in the store has a stock_quantity of 0, the customer will also be turned away.
* If there are departments and products in stock, the Customer will be presented with a table of existing products, and then asked if they would like to purchase anything. If the customer would like to purchase an item, the customer will be prompted to enter the product_id and the quantity of the product they would like to have.
	* If there is enough in stock to fulfill quantity asked for, the tables will be updated for the Manager and Supervisor view. 
	* If there is not enough in stock, the customer will be asked to come back later when there is more.

## Running the application locally
 1. Clone the repository using the link under "Live Demonstration" below.
 2. Once cloned, install all the dependencies using the following command
    ```
    npm install
    ```
 3. After installing the dependencies, run the create database and tables code provided in amazazon.sql.
 4. Now you are ready to use the application!
 ### To use customer's view
 1. Run the command:
 ```
 node amazazonCustomer.js
 ```
 2. A table of the store's products should be presented thanks to npm package console.table if there are products available. If there are no products available, a message will appear letting the customer know and asking them to come back later.
 3. If there are products in the store, then the customer will also be prompted with questions, starting with if a person is interested in buying anything from the store
	* If a person is interested in buying something from the store, they are then prompted to enter the ID and quantity of the product.
		* This app controls for if the product does not exist or does not have enough in stock! If there are enough in stock, the amount is then decreased from the stock and a message is shown letting the customer know how much they have spent on the item.
 ### To use the manager's view
 1. Run the command:
 ```
 node amazazonManager.js
 ```
 2. The app will initially prompt the manager to choose from a list of actions such as
 ```
 > View Products for Sale
   View Low Inventory
   Add to Inventory
   Add New Product
   Exit
 ```
 #### Viewing Products for Sale
 When this is chosen, a table is shown showing item id, product name, department name, price, stock quantity, and amount of product sales.
 #### View Low Inventory
 When this is chosen, a table is shown showing items with the stock quantity of amount less than 5.
 #### Add to Inventory
 When this is chosen, a series of questions will be asked to assist the manager in updating the stock quantity of an existing item.
 #### Add New Product
 When this is chsoen, a series of questions willbe asked to assist the manager in adding products within available departments.
 #### Exit
 When this is chosen, the app ends.

 ### To use the supervisor's view
 1. Run the command: 
 ```
 node amazazonSupervisor.js
 ```
 2. The app will initially prompt the manager to choose from a list of actions such as
 ```
 > View Product Sales by Department
   Create New Department
   Exit
 ```
 #### View Product Sales by Department
 When this is chosen, a table is shown displaying all the departments of the store including department id number, department name, overhead costs, amount of product sales, and total profit.
 #### Create New Department
 When this is chosen, the supervisor will be prompted with questions that will assist them in creating this new department.
 After this department is created, a manager will be able to add products into the department.

## Live Demonsration
This application is not hosted on the web. Please clone the repository [here](https://github.com/michellele994/Amazazon) and follow the instructions above.
#### Thank you!
Michelle Le (c) 2018

