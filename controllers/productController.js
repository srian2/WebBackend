// const Product = require('../model/Product'); const fs = require('fs'); const path = require('path');    // Create a new product  const createProduct = async (req, res) => {    try {      const { productName, price, description } = req.body;      const productImage = req.file ? req.file.filename : null;        const product = await Product.create({        productName,        price, 
//       description, 
//       productImage,     });       res.status(201).json(product); 
// 25.   } catch (error) { 
// 26.     res.status(500).json({ error: error.message }); 
// 27.   } 
// 28. }; 
// 29.  
// 30. // Get all products 
