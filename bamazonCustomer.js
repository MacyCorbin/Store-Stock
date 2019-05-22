var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user:"root",
    password:"root",
    database: "bamazon_db"
})

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
    productList();
})

//This is the list of products
var productList = function(){
    var query = "SELECT * FROM products";
    connection.query(query,function(err,res){
        if(err) throw err;
        var displayList = new Table({
            head:["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
            colWidths: [15, 30, 30, 15, 15]
        });

        for (var i = 0; i< res.length; i++){
            displayList.push(
                [res[i].product_id, res[i].product_name, res[i].department_name, res[i].price, res[i].quantity]
            );
        }

        console.log(displayList.toString());
        purchaseProduct();

    });
}


//The inquirer prompt guides the user for purchasing a product by asking for the ID and the Quantity
function purchaseProduct(){
    inquirer.prompt([
    {
        name: "productID",
        type: "input",
        message: "Please enter the product ID of the item you want to purchase",
        validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
            return false;
        },

        name: "productQuantity",
        type: "input",
        message: "Please enter the number of the items you want to purchase",
        validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
            return false;
        }
    }

    ]).then(function(answers){
        var idSubmitted = answers.productID;
        var quantitySubmitted = answers.productQuantity;
        productOrder(idSubmitted, quantitySubmitted);
    });
};

function productOrder(productID, amountRequired){
    connection.query('SELECT * FROM products WHERE product_id ='+ productID, function(err, res){
        if(err){console.log(err)};
        if ( amountRequired <= res[0].stock){
            var cost = res[0].price * amountRequired;
            console.log("\nYour order is in stock!");
            console.log("\nYour total cost for" 
            + amountRequired
            + " " + res[0].product_name
            + "is" + cost);

        }else{
            console.log("Sorry, there is insufficient quantity of " + res[0].product_name + " to fulfill your order.")
        };
        productList();
    });
};

productList();