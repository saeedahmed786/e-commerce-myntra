import axios from 'axios';
 import React, { useEffect, useState} from 'react';
 import ReactQuill from 'react-quill';
 import { Link } from 'react-router-dom';
 import { Layout } from './Layout';
 import '../../index.css'
 import { Button, message, Select, TreeSelect, Upload } from 'antd';
 import { Badge } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import swal from 'sweetalert';



const { Option } = Select;
const { TreeNode } = TreeSelect;


 export const EditProduct = (props) => {

    const productId = props.match.params.id;
    const [modalVisible, setModalVisible] = useState(false);
    const [product, setProduct] = useState();
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');  
    const [price, setPrice] = useState('');
    const [offer, setOffer] = useState(''); 
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [file, setFile] = useState([]);
    const [image, setImage] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [brandId, setBrandId] = useState('');
    const [cat, setCat] = useState('');
    const [success, setSuccess] = useState(false);


    
  
 /********************************************* Modal *******************************************************/    
     const openModal = () => {
         setModalVisible(true);
         setTitle(product.title);
         setSubTitle(product.subTitle);
         setBrand(product.brand.name);
         setBrandId(product.brand._id)
         setCategory(product.category.name);
         setImage(product.productPictures);
         setDescription(product.description);
         setOffer(product.offer);
         setPrice(product.price);
         setSize(product.productSizes);
         setColor(product.productColors);
        
     }
    
    
    
/********************************************* OnChange *******************************************************/    
                const quillChange = (value) => {
                    setDescription(value);
                }
                

                function handleSizeChange(value) {
                  setSize(value);
                    
               }
              
                console.log(size);
                console.log(brandId);
                console.log(color);
                console.log(description);
                console.log(cat);

                const onCatChange = value => {
                    setCat(value);
                };

                function handleBrandChange(value) {
                    setBrandId(
                    value

                    );
                }

                function handleColorChange(value) {
                    setColor(
                    value

                    );
                }



/************************************************** Image Change ***********************************************/   
              const handleImageChange = (e) => { 
                  setFile([
                    ...file,
                    e.target.files[0]
          
                  ])
                }

                const handleRemovePresentImage = name => {
                  setImage(image => image.filter(item => item.img !== name.img));
              }
    
              const handleRemoveUploadedImage = name => {
                setFile(file => file.filter(item => item.name !== name.name))
            }
          //   const handleRemoveSizes = name => {
          //     setSize(size => size.filter(item => item.size !== name.size))
          // }

          console.log(size);

 /************************************************** Get Product ***********************************************/   
            const editHandler = () => {
                axios.get(`/api/products/${productId}`).then(res => {
                setProduct(res.data.findProduct);
                })

            }     


 /****************************************** Get Categories & Brands *******************************************/    
            const fetchCategories =  () => {
                axios.get('/api/categories').then(data => {
                setCategories(data.data);
            })
            }

            const fetchBrands = () => {
                axios.get('/api/categories/brands').then(data => {
                setBrands(data.data.brands);
            })
            }


    
  /***************************************************** useEffect **********************************************/           
            useEffect(() => {
                if(success) {
                   setModalVisible(false);
       
                }
                
                
                editHandler();
                fetchBrands();
                fetchCategories();
             
       
       
              return () => {
               
              }
            }, [success]);
       

/***************************************************** Submit Event **********************************************/           
     const submitHandler = (e) => {
         e.preventDefault();
         let data = new FormData();
         data.append('title', title);
         data.append('subTitle', subTitle);
         data.append('description', description);
         data.append('price', price);
         data.append('offer', offer);
         data.append('cat', cat);
         data.append('brandId', brandId);
         for(let sizes of size) {
           data.append('sizes', sizes);
          }
          for(let colors of color) {
           data.append('colors', colors);
          }

          for(let i = 0; i < image.length; i++)
          {
           data.append("images", image[i].img);
          }
        
            for(let pic of file) {
          data.append('file', pic);
         }
         axios.put(`/api/products/update/${productId}`, data).then(res => {
             if (res.status === 200) {
             swal('Great!', res.data.successMessage, 'success');
             }
             else {
               swal('Error', res.data.errorMessage, 'error');
             }
           })

     }    
      


/***************************************************** Form *******************************************************/              
        return ( 
            <>
             <Layout sidebar>

            <div className = 'container'>
            {
              modalVisible ? null :

              <button onClick= { () => openModal({})} className = 'float-right mb-4 btn btn-outline-danger'>Click to Edit Product</button>            
            }


            </div>

            {
                modalVisible &&

                <div className = 'container edit-form text-center'>
                <form onSubmit = {submitHandler} style = {{width: '70%'}}>
                    <h1 className = 'font-weight-bold'>Edit "{product.title}"</h1><br/>
                   
                    <div className="form-group">
                        <input type = 'text' className="form-control" id = 'title' name ='title' value ={title} onChange = { (e) => setTitle(e.target.value)}></input><br/><br/>
                    </div>
                    
                    <div className="form-group">
                     </div>   
                        <input type = 'text' className="form-control" id = 'subTitle' name ='subTitle' value ={subTitle} onChange = { (e) => setSubTitle(e.target.value)}></input><br/><br/>
                    <div className="form-group">
                        <input type = 'text' className="form-control" id = 'price' value ={price} name ='price' onChange = { (e) => setPrice(e.target.value)}></input><br/><br/>
                      </div>
                    <div className = 'mb-3'>
                  
                    <Select
                        mode="tags"
                       placeholder =  {
                          size.map((size) => {
                             return <span className = 'mr-3'>  {size.size}</span>
                           
                        })
                       }
                        
                        onChange={handleSizeChange}
                        style={{ width: '70%'}}
                        > 
                        <Option key = 'Baby'>Baby</Option>
                        <Option key = 'XS'>XS</Option>
                        <Option key = 'S'>S</Option>
                        <Option key = 'M'>M</Option>
                        <Option key = 'L'>L</Option>
                        <Option key = 'XL'>XL</Option>
                        <Option key = 'XXL'>XXL</Option>
                        
                    </Select>
                    </div>

                    <div className = 'my-5'>
                    <Select
                        mode="tags"
                        placeholder = {[color.map(col => {
                           
                           return(
                               <>
                                <span className = 'mr-3'>{col.color}, 
                                </span>
                                </>
                           )
                          
                       
                       })]}
                        onChange={handleColorChange}
                        style={{ width: '70%'}}
                        > 
                        <Option key = 'White'>White</Option>
                        <Option key = 'Black'>Black</Option>
                        <Option key = 'Brown'>Brown</Option>
                        <Option key = 'Red'>Red</Option>
                        <Option key = 'Green'>Green</Option>
                        <Option key = 'Gray'>Gray</Option>
                        <Option key = 'Blue'>Blue</Option>
                        
                    </Select>
                    </div>
                    <Select
                           className = 'mb-3'
                            style={{ width: '70%' }}
                            placeholder="Select a Brand"
                            defaultValue = {[brand]}
                            onChange={handleBrandChange}
                           >
                        {
                          brands.map(bran => {
                            return(
                              <Option key = {bran._id}>{bran.name}</Option>

                            )
                          })
                           
                        }
                          
                    </Select>

                    <TreeSelect
                    className = 'my-4'
                      showSearch
                      style={{ width: '70%' }}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder={category}
                      defaultValue = {category}
                      allowClear                      
                      treeDefaultExpandAll
                      onChange={onCatChange}
                    >
                     {
                       categories.map(mainCat => {
                         return(
                          <TreeNode value={mainCat._id} title={mainCat.name}>
                            {
                              mainCat.children.map(subCat => {
                                return(
                                  <TreeNode value={subCat._id} title={subCat.name}>
                                    {
                                      subCat.children.map(childCat => {
                                        return(
                                          <TreeNode value={childCat._id} title={childCat.name} />

                                        )
                                      })
                                    }
                                  </TreeNode>
                                )

                              })
                            }
                          </TreeNode>
                         )
                       })
                     }
                     

                    </TreeSelect>

                    <div className = 'my-4'>
                      <ReactQuill placeholder = "Product Description" theme="snow" value= {description} onChange={quillChange}/>

                     </div>

                      <div className = 'my-5 files'>
                        <input type = 'file' id = 'file' className = 'mt-2'  name ='file' onChange = {handleImageChange}></input><br/>
                        <div>

                        {
                           image.map(pic => {
                             return(
                              <span className = 'mr-4'>
                                <Badge className = 'mt-4 mb-2' count={<a onClick={() =>handleRemovePresentImage(pic)}><DeleteOutlined style = {{marginLeft: '10px'}} /></a>}>
                                <img width = '100' height = '100' src = {pic.img} alt = 'images' className="head-example" />
                              </Badge>
                                </span>
                               
                             )
                           })
                         }

                        {file.map(pic => {
                            return(
                              <>
                              <div> <span>{pic.name} </span>
                                <a onClick={() =>handleRemoveUploadedImage(pic)}><DeleteOutlined style = {{marginLeft: '10px', color: 'black'}} /> </a>
                                </div>
                                </>
                            )
                        })}
                       
                        </div>
                    </div>

                  
                      
                   

                    <div>
                    <button type= 'submit' className = 'btn btn-outline-danger w-50 mt-3'> { productId? 'Update': 'Create'}</button> <br/> <br/>
                    <button className = 'btn btn-outline-danger w-25' onClick= {() => setModalVisible(false)}>Back</button>
                    </div>
                  

                </form>
            </div>
            }
    
            </Layout>
           
            </>
          
        )

  }
    

