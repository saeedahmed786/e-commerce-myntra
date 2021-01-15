const express = require('express');
const Product = require('../Models/productModel');
const upload = require('./multer');
const cloudinary = require('./cloudinary');
var fs = require('fs');
const Category = require('../Models/categoryModel');


const router = express.Router();



// function getAllProducts (products, parentId = null) {
//   const productList = [];
//   let product;
//   if(parentId == null) {
//     product = categories.filter(prod => prod.parentId == undefined);
//   } else {
//     product = categories.filter(prod => prod.parentId == parentId);
//   }

//   for(let produ of product) {
//       productList.push({
//           _id: produ._id,
//           name: produ.name,
//           category: produ.parentId,
//           children: getAllProducts(products, produ._id)
//       })
//   }
//   return productList;
// }

router.get('/get', async (req, res) => {
  const products =  await Product.find({}).select('_id title subTitle description productSizes productPictures price category')
                                          .populate('category').exec();

                                       
   res.status(200).json({products});
});







router.post('/create', upload.array('file'), async (req, res) => {
  // console.log(req.body.sizes);
  const uploader = async (path) => await cloudinary.uploads(path, 'Images')
  const urls = [];
        const files = req.files;
        for (const file of files) {
          const {path}   = file;
          const newPath = await uploader(path)
          urls.push(newPath);

          fs.unlinkSync(path);
        
        }
       
        if(urls && urls.length > 0) {
          productPictures = urls.map(pic => {
            return{
              img: pic.url
            }
          })
        }
        
        if(req.body.sizes && req.body.sizes.length > 0) {
          productSizes = req.body.sizes.map(savedSize => {
            return{
              size: savedSize
            }
            });
        }
 
        const product = new Product({
          title: req.body.title,
          subTitle: req.body.subTitle,
          description: req.body.description,
          price: req.body.price,
          productSizes,
          category: req.body.cat,
          productPictures
        });

         const newProd =  await product.save(((error, result) => {
            if(error) 
            {
              res.status(400).json({errorMessage: 'Failed to create product. Please try again', error})
            }
         else if(result) {
            console.log(result);
            res.status(200).send({successMessage: 'Porduct created successfully', result});
          } 
          else return null;
         
        }))
       
     
});

module.exports = router;



