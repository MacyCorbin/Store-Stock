var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var divider = "\n 🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹 \n"

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
})


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    productList();

});

// This is the list of products
var productList = function () {
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var displayList = new Table({
            head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
            colWidths: [15, 30, 30, 15, 15]
        });

        for (var i = 0; i < res.length; i++) {
            displayList.push(
                [res[i].product_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock]
            );
        }

        console.log(displayList.toString());
        purchaseProduct();

    });
}


function purchaseProduct() {
    inquirer.prompt([
        {
            name: "inputId",
            type: "input",
            message: "Please enter product ID you like to purchase.",

        },
        {
            name: "inputNumber",
            type: "input",
            message: "How many items do you want to purchase?",
        },
    ]).then(function (userOrder) {

        connection.query("SELECT * FROM products WHERE product_id =?", [userOrder.inputId], function (err, res) {
            for (var i = 0; i < res.length; i++) {

                if (userOrder.inputNumber > res[i].stock) {

                    console.log(divider);
                    console.log("Sorry! The amount of the item you want is not in stock. Please check back later!");
                    console.log(divider);

                    productList();

                } else {
                    //list item information for user for confirm prompt

                    console.log(divider);
                    console.log("-------You've selected-------");

                    console.log("Product: " + res[i].product_name);
                    console.log("Department: " + res[i].department_name);
                    console.log("Price: " + res[i].price);
                    console.log("Quantity: " + userOrder.inputNumber);
                    console.log("Total: " + res[i].price * userOrder.inputNumber);

                    var newStock = (res[i].stock - userOrder.inputNumber);
                    console.log("Stock remaining: " + newStock);
                    console.log(divider);
                    var purchaseId = (userOrder.inputId);
                    confirmOrder(newStock, purchaseId);

                    
                }
            }
        });
    }
    );
    

    function confirmOrder(newStock, purchaseId) {

    inquirer.prompt([{

    type: "confirm",
    name: "confirmPurchase",
    message: "Does your order seem correct?",
    default: true

    }]).then(function(userConfirm) {
    if (userConfirm.confirmPurchase === true) {

        //if user confirms purchase, update mysql database with new stock quantity by subtracting user quantity purchased.

        connection.query("UPDATE products SET ? WHERE ?", [{
            stock: newStock
        }, {
            product_id: purchaseId
        }], function(err, res) {});

        console.log(divider);
        console.log("Order completed. Thank you!");
        console.log(divider);
        productList();

    } else {
        console.log(divider);
        console.log("That is ok, you can come back again later!");
        console.log(divider);
        productList();
    }
    });
    }
}
