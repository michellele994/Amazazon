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

* Because the app starts off with empty tables, the app should start with the creation of a department. At this time, the **Customer** and the **Manager** is unable to perform any action nor view any table due to the lack of departments (See video).
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

#### Thank you!
Michelle Le (c) 2018

