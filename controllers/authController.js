const { Router } = require('express');
const authService = require('../services/authService');
const productService = require('../services/productService');
const router = Router();
const { COOKIE_NAME } = require('../config/config');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');


router.get('/login', isGuest, (req, res) => {
    res.render('login', {title: 'Login'});
})
router.post('/login', isGuest,  async (req, res)=>{
    const {username, password} = req.body;
    try {
        let token = await authService.login({username, password})

        res.cookie(COOKIE_NAME, token, {httpOnly: true});
        res.redirect('/products')
    } catch (error) {
        res.status(404).render('login', {title: 'Login', error});
    }
})
router.get('/register', isGuest, (req, res) => {
    res.render('register', {title: 'Register'})
})
router.post('/register', isGuest, async (req, res) => {
    const {username, password, repeatPassword, amount } = req.body;

    if(password !== repeatPassword){
        res.status(406).render('register', {error: {message:'Passwords do not match!'}});
        return;
    }

    try {
        let user = await authService.register({username, password, amount});
    try {
        let token = await authService.login({username, password})
        res.cookie(COOKIE_NAME, token);
        res.redirect('/')
    } catch (error) {
        res.status(404).render('login', {error})
    } 
    } catch (error) {
            res.status(404).render('register', {error})
            return;
    }
})
router.get('/logout', isAuthenticated, (req, res)=>{
    res.clearCookie(COOKIE_NAME);
    res.redirect('/')
})
router.post('/refill', isAuthenticated, async (req, res)=>{
    let newData = Number(req.body.amount);
    authService.getUser(req.user._id)
        .then(user =>{
            let amount = user.amount += newData;
            user.amount = amount
            authService.updateOne(req.user._id, user)
                .then(updatedUser =>{
                    res.redirect('/');
                })
        })
        .catch(error =>{
            res.redirect('/');
        })
})
router.get('/account-info', isAuthenticated, async (req, res)=>{
    let allExpenses = await productService.getAll()
    let allMadeByThisUser = allExpenses.filter(exp => exp.user == req.user._id);
    let expensesTotal = 0;
    allMadeByThisUser.forEach(exp => expensesTotal += exp.total);
    let totalMerchants = allMadeByThisUser.length;
    let user = await authService.getUser(req.user._id);
    let balance = user.amount - expensesTotal;

    res.render('account-info', {title: 'Account info', expensesTotal, totalMerchants, balance})
})
module.exports = router;