/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];
var CartTotal = {
    quantity: 0,
    sum: 0,
    items: 0,
};

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");
var $cartItems = $("#cart-items");
var $cartSummary = $("#cart-summary");
var $totalQty = $cartSummary.find('.total.total-quantity');
var $totalSum = $cartSummary.find('.total.total-sum');
var $totalItems = $cart.find('.total.total-items');

function dropCart(){
    Cart = [];
    updateCart();
}
$cart.find('.cart-clear').click(function(){
    dropCart();
});

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    //TODO: check if not exists in the Cart already
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    var old_item = Cart.find(function(elem, index, array){
        return elem.pizza.id == pizza.id && elem.size == size;
    });
    if(old_item){
        old_item.quantity += 1;
    } else {
        //Приклад реалізації, можна робити будь-яким іншим способом
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }

    //Оновити вміст кошика на сторінці
    updateCart();
}


function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    Cart = Cart.filter(function(elem){
        return !(elem.pizza.id == cart_item.pizza.id && elem.size == cart_item.size);
    });
    // console.log('removeFromCart');
    // console.log(cart_item);

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
    console.log('removeFromCart');

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function dropTotals() {
    CartTotal.quantity = 0;
    CartTotal.sum = 0;
    CartTotal.items = 0;
}

function updateTotals() {
    $totalQty.text(CartTotal.quantity);
    $totalSum.text(CartTotal.sum);
    $totalItems.text(CartTotal.items);
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cartItems.html("");
    dropTotals();

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".minus").click(function(){
            if(cart_item.quantity > 1){
                cart_item.quantity -= 1;
            } else {
                removeFromCart(cart_item);
            }
            //Оновлюємо відображення
            updateCart();
        });
        $node.find('.delete').click(function(){
            removeFromCart(cart_item);
            updateCart();
        });

        $cartItems.append($node);
    }

    function processPizzaInCart(cart_item){
        CartTotal.quantity += cart_item.quantity;
        CartTotal.sum += cart_item.quantity*cart_item.pizza[cart_item.size].price;
        CartTotal.items += 1;
        showOnePizzaInCart(cart_item);
    }

    // Cart.forEach(showOnePizzaInCart);
    Cart.forEach(processPizzaInCart);
    updateTotals();

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;