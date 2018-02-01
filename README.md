# Amazazon
* A knock-off-for-educational-purposes application of online stores.

### There are 3 parts to this applications
#### Customer View
* A customer would be running through the amazazonCustomer.js, where the customer will be shown a table of products that are currently being sold.
* The app also checks whether or not there are even any products or if there are any products in stock.

* After being presented with a table of products, the customer is then prompted using npm inquirer. The customer would then have the options of picking from the table what they are looking to buy and how much.
* If there are not enough of the item in stock, the customer will be notified.
* If there are enough of the item in stock, the customer will be notifed and the database will be updated.

To see these updates, you would have to be viewing this application through the **Manager** or **Supervisor** view.

####Manager View
A manager would initially be prompted to choose what they wish to do out of a list of actions including, *View Products for Sale*, *View Low Inventory*, * Add to Inventory*, and *Add New Product*.

**View Products for Sale**
* Supervisors will be able to view all information on the products including stock_quantities
**View Low Inventory**
* Here, supervisors are able to call for a table that notifies them of the items that will soon be running out of stock.
**Add to Inventory**
* Supervisors have the ability to add more items to a product in the existing table. If a supervisor would like to add a brand new product, they would have to go through *Add New Product*

