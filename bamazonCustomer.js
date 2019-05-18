var mysql = require("mysql");

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

    selectAll();
})

function selectAll(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.log(res);
    })
}