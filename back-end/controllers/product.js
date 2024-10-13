const { default: mongoose } = require('mongoose')
const Product = require('../models/Products.js')

const getProduct = async (req,res) => {
    try {
        const product = await Product.find({})
        res.status(200).json({success:true,data:product})
    } catch (error) {
        console.error(`Error in Showing the Product`,error.message);
        res.status(500).json({success:false,message:"server error "})
    }
}


const postProduct = async (req,res) => {
    const product = req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,message:"Please provide all fields",data:product})
    }
    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({success:true , data: newProduct})
    } catch (error) {
        console.error(`Error in creating the Product`,error.message);
        res.status(500).json({success:false,message:"server error"})
    
    }
}

const updateProduct = async (req,res) => {
    const {id} = req.params
    const product = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Product not found"})
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true})
        res.status(200).json({success:true,data:updatedProduct})
    } catch (error) {
        console.error(`Error in creating the Product`,error.message);
        res.status(500).json({success:false,message:"server error"})
    }
}

const deleteProduct = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Product not found"})
    }
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success:true,message:'Product Deleted'})
    } catch (error) {
        console.error("Error in deleting product",error.message);
        res.status(500).json({success:false,message:"server error"})
    }
}


module.exports = { getProduct, postProduct , updateProduct , deleteProduct}