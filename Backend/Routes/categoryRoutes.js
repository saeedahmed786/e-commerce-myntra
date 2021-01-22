const express = require('express');
const Category = require('../Models/categoryModel');
const Brand = require('../Models/brandCategoryModel');

const router = express.Router();

function getAllCategories (categories, parentId = null) {
    const categoryList = [];
    let category;
    if(parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for(let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            category: cate.mainCatName,
            children: getAllCategories(categories, cate._id)
        })
    }
    return categoryList;
}

router.get('/', async (req, res) => {
    Category.find({})
    .exec((error, categories) => {
        if(error) {
            res.status(404).json({errorMessage: 'Error in finding categories'});
        }
        if(categories) {
            const categoryList = getAllCategories(categories);
            res.status(200).send(categoryList);
        }
    });
});

router.post('/main-category/create', async(req, res) => {
    const category = new Category({
        name: req.body.name,
    });

    if(req.body.parentId) {
        category.parentId === req.body.parentId
    }
    const ifAlreadyExists = await Category.findOne({name: req.body.name});
    if(ifAlreadyExists) {
        res.status(201).json({errorMessage: `Category ${req.body.name} already exists`})
    } else {
    const newCategory = category.save();
    if(newCategory) {
        res.status(200).json(`Category ${req.body.name} created successfully`);
    } else {
        res.status(400).json('Category is not created. Please Try Again')
    }
  }
});


router.post('/sub-category/create', async(req, res) => {
    const category = new Category({
        name: req.body.name,
        parentId: req.body.parentId
    });

    if(req.body.parentId) {
        category.parentId === req.body.parentId
    }
    const ifAlreadyExists = await Category.findOne({name: req.body.name});
    if(ifAlreadyExists) {
        res.status(201).json({errorMessage: `Category ${req.body.name} already exists`})
    } else {
    const newCategory = category.save();
    if(newCategory) {
        res.status(200).json(`Category ${req.body.name} created successfully`);
    } else {
        res.status(400).json('Category is not created. Please Try Again')
    }
  }
});

router.post('/child-sub-category/create', async(req, res) => {
    const saveSubCat = new Category({
        name: req.body.name,
        parentId: req.body.parentId
    });

    if(req.body.parentId) {
        saveSubCat.parentId === req.body.parentId
    }
    
    const ifAlreadyExists = await Category.findOne({name: req.body.name});
    if(ifAlreadyExists) {
        res.status(201).json({errorMessage: `Sub-Category ${req.body.name} already Exists`});
    } else {
        const savedSubCat =  await saveSubCat.save();
        if(savedSubCat) {
            res.status(200).json({successMessage: `Sub-Category ${req.body.name} is created successfully!`});
        } else {
            res.status(400).json({errorMessage: `Unable to create Sub-Category ${req.body.name}. Please Try Again in a while`})
        }
    }

});

router.get('/edit/:id', async(req, res) => {
    const editCategory = await Category.findById({_id: req.params.id});
    if(!editCategory.parentId){
        res.status(200).json({category: editCategory});
    }  
     else if(editCategory || editCategory.parentId) {
        const parentCat = await Category.findById({_id: editCategory.parentId})
        res.status(200).json({category: editCategory, parentCat: parentCat});
    } else {
        res.status(400).json({errorMessage: 'Category not found. Please try again'});
    }

    
    

});

router.put('/update/:id', async(req, res) => {
    const editCategory = await Category.findById({_id : req.params.id});
    if(editCategory) {
        editCategory.name = req.body.cat;

        const editedCategory = editCategory.save();
        if(editedCategory) {
            res.status(200).json({successMessage: `Category name has changed to ${req.body.cat}`})
        }
  
     } else {
        res.status(400).json({errorMessage: 'Unable to change Category name. Please try again!'});
    }

});

router.delete('/delete/:id', async(req, res) => {
    const deleteCategory = await Category.findByIdAndDelete({_id: req.params.id})
    if(deleteCategory) {
        res.status(200).json({successMessage: `Category ${deleteCategory.name} has been deleted successfully`});
    } else {
        res.status(400).json({errorMessage: 'Category could not be deleted. Please try again'});
    }

});




/***********************************************************Brands *******************************************/

router.get('/brands', async(req, res) => {
    await Brand.find().sort('1').exec((error, brands) => {
        if(error) {
            res.status(404).json({errorMessage: 'No Brands Found'});
        }
        if(brands) {
            res.status(200).json({brands});
        }
    })
});

router.get('/brands/:id', async(req, res) => {

    await await Brand.findById({_id: req.params.id}).exec((error, brand) => {
        if(error) {
            res.status(404).json({errorMessage: `Brand ${req.params.id} not found`});
        }
        if(brand) {
            res.status(200).json({brand});
        }
    })
});



router.post('/brands/create', async (req, res) => {
    const brands = new Brand({
        name: req.body.name
    });

    const ifAlreadyExists =  await Brand.findOne({name: req.body.name});
    if(ifAlreadyExists) {
        res.status(201).json({errorMessage: `Brand ${req.body.name} already exists`});
    } else {
        await brands.save((error, brand) => {
            if(error) {
                res.status(400).json({errorMessage: 'Failed to create brand. Please try again'});
            }
            if(brand) {
                res.status(200).json({successMessage: `Brand ${brand.name} created successfully`});
            }
          
        })

    }

 
})

router.put('/brands/update/:id', async(req, res) => {
   const brand =  await Brand.findById({_id: req.params.id});
   if(brand) {
       brand.name = req.body.name;

      const editBrand =  brand.save();
      if(editBrand) {
          res.status(200).json({successMessage: `Brand name changed to ${req.body.name} successfully`});
      } else {
          res.status(400).json({errorMessage: 'Failed to update brand name'});
      }
   }   
   else {
    res.status(404).json({errorMessage: 'Brand not found'});
}
})

router.delete('/brands/delete/:id', async(req, res) => {
    console.log(req.params.id);
    await Brand.findByIdAndRemove({_id: req.params.id}).exec((error, brand) => {
        if(brand) {
            res.status(200).json({successMessage: `Brand ${brand.name} deleted successfully`});
        } 
        if(error) {
            res.status(400).json({errorMessage: `Unable to delete brand. Please try again`});
        }
    })
    

})


module.exports = router;