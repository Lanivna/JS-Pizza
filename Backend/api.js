const LIQPAY_PUBLIC_KEY = 'i87525028663';
const LIQPAY_PRIVATE_KEY = 'EzlJWItugaWTyh04GMnb7fQ47BEQIEqrnT6RYh8Q';

var Pizza_List = require('./data/Pizza_List');

function liqpayOrder(order_info){
    var info = [];
    info.push('Name: ' + order_info.name);
    info.push('Address: ' + order_info.addr);
    info.push('Phone: ' + order_info.phone);

    var order = {
        version: 3,
        public_key: LIQPAY_PUBLIC_KEY,
        action: 'pay',
        sandbox: 1,
        amount: 1,
        currency: 'UAH',
        description: info.join("\n"),
        order_id: new Date*1,
    };

    return order;
}

function liqpayData(order){
    return new Buffer(JSON.stringify(order)).toString('base64');
}

var crypto	=	require('crypto');
function sha1(string){
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}

function liqpaySignature(data){
    return sha1(LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY);
}

exports.getPizzaList = function(req, res) {
    var Pizza_List = require('./data/Pizza_List');
    res.send(Pizza_List);
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);
    var order = liqpayOrder(order_info);
    var data = liqpayData(order);

    res.send({
        success: true,
        order: order,
        data: data,
        signature: liqpaySignature(data),
    });
};