const express = require('express')
const router = express.Router()
const {getProduct,deleteProduct,postProduct,updateProduct} = require('../controllers/product.js')


router.route('/').get(getProduct).post(postProduct)

router.route('/:id').delete(deleteProduct).put(updateProduct)

module.exports = router