const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
res.status(200).json({
    message: 'handeling Get requests to /products'

});
});

router.post('/', (req, res, next) => {
    const product = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: 'handeling POST requests to /products',
        createdProduct: product
    
    });
    });

    router.get('/:productId', (req, res, next) => {
        const id = req.params.productId;
        if (id === 'special' ) {
            res.status(200).json({
                message: 'you discovered the special ID',
                id: id

            });
        } else {
            res.status(200).json({
                message: 'you passed an ID'

            })
        }
    } );


    router.patch('/:productId', (req, res, next) => {
        res.status(200).json({
            message: 'Updated product'
        });
       
        }
    );


    router.delete('/:productId', (req, res, next) => {
        res.status(200).json({
            message: 'Deleted product'
        });
       
        }
    );

    module.exports = router;