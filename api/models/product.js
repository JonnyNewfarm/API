const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    ingredients: String,
    imgUrl: { type: String, required: true}
});

module.exports = mongoose.model('Product', productSchema);
