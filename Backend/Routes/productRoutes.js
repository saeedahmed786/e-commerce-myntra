const express = require('express');
const Product = require('../Models/productModel');
const upload = require('./multer');
const cloudinary = require('./cloudinary');
const cloudinaryCon = require('./cloudinaryConfig');
var fs = require('fs');
const Category = require('../Models/categoryModel');


const router = express.Router();



router.get('/get', async (req, res) => {
  const products =  await Product.find({}).select('_id title subTitle brand description productSizes productPictures price category')
                                          .populate('category brand').exec();

                                       
   res.status(200).json({products});
});


router.get('/:id', async(req, res) => {
     console.log(req.params.id);
      
     const findProduct = await Product.findById({_id: req.params.id}).select('_id title productColors offer subTitle brand description productSizes productPictures price category')
                                                                      .populate('category brand').exec();
     if(findProduct) {
       res.status(200).json({findProduct});
     }

    });

 router.post('/create', upload.array('file'), async (req, res) => {
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
              img: pic.url,
              cloudinary_id: pic.id
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
        if(req.body.colors && req.body.colors.length > 0) {
          productColors = req.body.colors.map(saveColor => {
            return{
              color: saveColor
            }
            });
        }
          const product = new Product({
            title: req.body.title,
            subTitle: req.body.subTitle,
            description: req.body.description,
            price: req.body.price,
            offer: req.body.offer,
            productSizes,
            productColors,
            category: req.body.cat,
            brand: req.body.brandId,
            productPictures
            
          });

          const newProd =  await product.save(((error, result) => {
            if(error) 
            {
              res.status(400).json({errorMessage: 'Failed to create product. Please try again', error})
            }
         else if(result) {
            res.status(200).send({successMessage: 'Porduct created successfully', result});
          } 
          else return null;
         
        }))

});



router.put('/update/:id', upload.any(),async(req, res) => {

  const findProduct = await Product.findById({_id: req.params.id});
     if(findProduct) {

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

      else if(req.body.images && req.body.images.length > 0) {
          productPictures = req.body.images.map(pic => {
            return{
              img: pic.url
            }
          })
        }
       else {
         return false;
       }
       
        if(req.body.sizes && req.body.sizes.length > 0) {
          productSizes = req.body.sizes.map(savedSize => {
            return{
              size: savedSize
            }
            });
        }
        if(req.body.colors && req.body.colors.length > 0) {
          productColors = req.body.colors.map(saveColor => {
            return{
              color: saveColor
            }
            });
        }
        
            findProduct.title = req.body.title,
            findProduct.subTitle = req.body.subTitle,
            findProduct.description = req.body.description,
            findProduct.price = req.body.price,
            findProduct.offer = req.body.offer,
            findProduct.productSizes = productSizes,
            findProduct.productColors = productColors
            findProduct.category = req.body.cat,
            findProduct.brand = req.body.brandId,
            findProduct.productPictures = productPictures
            
         

          const editProd =  await findProduct.save(((error, result) => {
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

      }

      else {
        res.status(404).json({errorMessage: 'Product not found'});
      }

     
      

   
   
    });


router.delete('/delete/:id', async(req, res) => {
    let product =  await Product.findById({_id: req.params.id});
       if(product) {
         product.productPictures.map(pic => {
          const imgUrl = pic.cloudinary_id;
          const del =  cloudinaryCon.uploader.destroy(imgUrl);
         });
        product.remove(); 
        res.status(200).json({successMessage: 'Product Deleted Successfully'});


       }
     
    

});

module.exports = router;



