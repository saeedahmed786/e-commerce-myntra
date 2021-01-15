const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
   
}, {timestamps: true}
);

const brandModel = mongoose.model('Brand', brandSchema);
module.exports = brandModel;