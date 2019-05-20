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
//function purchaseProduct()