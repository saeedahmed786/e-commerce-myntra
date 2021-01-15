const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    mainCatName: {
        type: String
         
     },
    parentId: {
        type: String
    }, 
   
}, {timestamps: true}
);

const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;