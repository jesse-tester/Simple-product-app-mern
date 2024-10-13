const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')
const product = require('./routes/product.js')
const path = require('path')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

const _dirname = path.resolve()

app.use(express.json())

app.use('/api/products',product)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname,"/front-end/dist")))

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(_dirname,'front-end','dist','index.html'))
    })
}

app.listen(PORT,() =>{
    connectDB()
    console.log("Server started at http://localhost:"+PORT)
})
