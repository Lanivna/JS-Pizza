/**
 * Created by chaika on 02.02.16.
 */
var fs = require('fs');
var ejs = require('ejs');


exports.PizzaMenu_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/PizzaMenu_OneItem.ejs', "utf8"));

exports.PizzaCart_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/PizzaCart_OneItem.ejs', "utf8"));

exports.header = ejs.compile(fs.readFileSync('./Frontend/templates/header.ejs', "utf8"));
exports.footer = ejs.compile(fs.readFileSync('./Frontend/templates/footer.ejs', "utf8"));
exports.cart = ejs.compile(fs.readFileSync('./Frontend/templates/cart.ejs', "utf8"));
