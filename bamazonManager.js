var mysql = require("mysql");
var inquirer = require("inquirer");
var inStock = 0;
var totalPrice = 0;

///////////////////////////////////////////////////////////////////////////  
//connect to the DB/////////

var connection = mysql.createConnection({
    host: "localhost",
    port: 3300,

    user: "root",
    password: "root",
    database: "bamazon_DB"
});

// Connect to SQL server and SQL DB
connection.connect(function (err) {
    if (err) throw err;

    // run start function after connection is made to prompt user
    showProducts();
});
///////////////////////////////////////////////////////////////////////////  
// end of connect to DB/////////



///////////////////////////////////////////////////////////////////////////  
// function to display all products to the console

function showProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log('');
        console.log('-------------Our current Inventory---------------');
        console.log('');


        for (var i = 0; i < res.length; i++) {
            console.log('Item ID: ' + res[i].id + '      Product: ' + res[i].product + '      Department: ' + res[i].department);
            console.log('Price: ' + res[i].price + '      Quanity Left: ' + res[i].quanity);
            console.log(' ');

        }

        manageStore();
    });
}

///////////////////////////////////////////////////////////////////////////  
// function to display all products to the console




// inquirer function  add to direct code/////////


function manageStore() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw console.log("connection error:" + err);
        inquirer
            .prompt([
                {
                    name: 'selectId',
                    type: 'list',
                    message: 'Choose an option below to manage inventory:',
                    choices: ["Add inventory", "Add a new product", "Remove a product", "Quit"]

                }

                //  end inquirer function  add to direct code/////////






                //if else function to guide code/////////



            ]).then(function (answers) {
                if (answers.selectId === "Add inventory") {
                    addInventory()
                } else if (answers.selectId === "Add a new product") {
                    newProduct()
                } else if (answers.selectId === "Remove a product") {
                    deleteProduct()
                } else if (answers.selectId === "Quit") {
                    quit()
                } else {
                    console.log("Please choose one of the options");
                }
            });


        // end of if else function to guide code/////////




        //function  add to inventory/////////


        function addInventory() {
            inquirer.prompt([

                {
                    name: "ID",
                    type: "input",
                    message: "What is the item number you wish to restock?"
                }, {
                    name: 'Quantity',
                    type: 'input',
                    message: "How many would you like to add?"
                },

            ]).then(function (answers) {
                //set captured input as variables, pass variables as parameters.
                var quantityAdded = answers.Quantity;
                var IDOfProduct = answers.ID;
                restockDatabase(IDOfProduct, quantityAdded);
            });
        }; //end restockRequest

        function restockDatabase(id, quant) {
            //update the database
            connection.query('SELECT * FROM products WHERE id = ' + id, function (error, response) {
                if (error) { console.log(error) };
                connection.query('UPDATE products SET quanity = Quanity + ' + quant + ' WHERE id = ' + id);
                //re-run display to show updated results
                showProducts();
            });
        };

        //function  add to inventory/////////




        //function  to add a new product


        function newProduct() {
            inquirer.prompt([

                {
                    name: 'name',
                    type: 'input',
                    message: "Name of new product?"
                },
                {
                    name: 'department',
                    type: 'input',
                    message: "Department?"
                },
                {
                    name: 'price',
                    type: 'input',
                    message: "Price?"
                },
                {
                    name: 'quanity',
                    type: 'input',
                    message: "quanity?"
                },

            ]).then(function (answers) {
                //set captured input as variables, pass variables as parameters.
                var name = answers.name;
                var department = answers.department;
                var price = answers.price;
                var quanity = answers.quanity;

                addNewItemtoDB(name, department, price, quanity);
            });
        };

        function addNewItemtoDB(name, department, price, quanity) {
            //     if (error) { console.log(error) };
            connection.query('INSERT INTO products (product, department, price, quanity) VALUES("' + name + '","' + department + '",' + price + ',' + quanity + ')');


            showProducts();

        };


        // end of function  to add a new product


        function deleteProduct() {
            inquirer.prompt([{
                name: "ID",
                type: "input",
                message: "Enter the ID number for the item you wish to remove?"
            }]).then(function (answer) {
                var id = answer.ID;
                deleteFromDB(id);
            });
        };

        function deleteFromDB(id) {
            connection.query("DELETE FROM products WHERE id =" + id);
            showProducts();
        }



    });
} 
