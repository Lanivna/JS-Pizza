/**
 * Created by chaika on 09.02.16.
 */
exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: 'Вибір Піци',
        pageId: 'mainPage',
    });
};

exports.orderPage = function(req, res) {
    res.render('orderPage', {
        pageTitle: 'Замовлення Піци',
        pageId: 'orderPage',
        cartOptions: {
            editable: false,
        },
    });
};