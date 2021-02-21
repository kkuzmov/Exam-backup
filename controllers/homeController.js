const { Router } = require('express');
const productService = require('../services/productService');
const router = Router();

router.get('/', (req, res) => {
    productService.getAll()
        .then(expenses =>{
            if(req.user){
                expenses = expenses.filter(expense => expense.user == req.user._id);
                res.render('expenses', {title: 'All expenses', expenses});
            }else{
                res.render('home', {title: 'Home'});
            }
        })
})

module.exports = router

