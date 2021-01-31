const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    minPrice: {
        type: Number,
        required: true
    },
    maxPrice: {
        type: Number,
        required: true
    }
});

const priceModel = new mongoose.model('Price', priceSchema);

module.exports = priceModel;