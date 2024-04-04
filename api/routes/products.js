const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
const multer = require('multer');








router.get('/', (req, res, next) => {
Product.find()
.select('name price imgUrl _id ingredients')
.exec()
.then( docs => {
    const response = {
        count: docs.length,
        products: docs.map(doc => {
            return {
              name:doc.name,
              price: doc.price,
              _id: doc._id,
              imgUrl: doc.imgUrl,
              ingredients: doc.ingredients,

            }
        })
    }
    
    
    
    res.status(200).json(response);
})
.catch( error => {
    console.log(error)
    res.status(500).json({
        error: error
    })
});
});

router.post('/',(req, res, next) => {
   

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
        ingredients: req.body.ingredients
});
product
.save()
.then(result => {
    console.log(result)
    res.status(201).json({
        message: 'Created new product',
        createdProduct: {
            _id: result._id,
            name: result.name,
            price: result.price,
            imgUrl: result.imgUrl,
            ingredients: result.ingredients



        }
    
    });
})
.catch(error => { 
    
console.log(error)
res.status(500).json({
    error: error
})

  
    });
});
    router.get('/:productId', (req, res, next) => {
        const id = req.params.productId;
        Product.findById(id)
        .exec()
        .then(doc => {
            console.log("From database",doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No valid entry found for this ID'})
            }
            
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: error})
        })
        
    } );


    router.patch('/:productId', (req, res, next) => {
        const id = req.params.productId;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        Product.updateOne({ _id: id }, {$set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product updated'
            });
           
          
        })
        .catch( error => {
            console.log(error)
            res.status(500).json({
                error: error
            })
        })
       
        
    });


    router.delete('/:productId', (req, res, next) => {
        const id = req.params.productId;
        Product.deleteMany( { _id: id })
        .exec()
        .then( result => {
            res.status(200).json(result);
        })
        .catch(error => {
           console.log(error);
           res.status(500).json({
            error: error
           }) 
        })
     
       });

    module.exports = router;