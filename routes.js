const { Router } = require('express');

const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/products', productController);
router.get('*', (req, res)=>{
    res.status(404).render('404-and-notifications');
})

module.exports = router;
