const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
const { validateProduct } = require('../controllers/helpers/productHelper'); // валидатор за продукт - провери дали е нужен


router.get('/', (req, res) => {
    res.redirect('/');
})
router.get('/create', isAuthenticated, (req, res) => {
        res.render('new-expense', {title: 'Create a new expense'});
})
router.post('/create',isAuthenticated,  (req, res) => {
    req.body.report === 'on' ? req.body.report = true : req.body.report = false;
    req.body.user = req.user._id;
    productService.createProduct(req.body)
        .then(expense =>{
            res.redirect('/')
        })
        .catch(error =>{
            res.render('new-expense', {error})
        })

})
router.get('/:productId/report',isAuthenticated,  (req, res)=>{
        productService.getOne(req.params.productId)
            .then(product =>{

                res.render('report', {title: 'Report', product})
            })
})
router.get('/:productId/stop-tracking', isAuthenticated,  (req, res)=>{
        productService.deleteOne(req.params.productId)
            .then(deleted =>{
                res.redirect('/')
            })
            .catch(error =>{
                res.render('expenses', {error});
            })
})


module.exports = router;