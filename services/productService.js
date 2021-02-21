const Product = require('../models/Product');

async function getAll(){
    let products = await Product.find({}).lean()
    return products;
}
async function getOne(id){
    return Product.findById(id).lean();
}
function createProduct(data){
       let product = new Product({...data}); 
       return product.save()
}
function deleteOne(productId){
     return Product.deleteOne({_id: productId})
}
module.exports = {
    getAll,
    getOne,
    createProduct,
    deleteOne
}