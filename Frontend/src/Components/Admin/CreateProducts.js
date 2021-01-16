import { Button, message, Select, TreeSelect, Upload } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import MultiImageInput from 'react-multiple-image-input';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import swal from 'sweetalert';


const { Option } = Select;
const { TreeNode } = TreeSelect;


export const CreateProducts = () => {
   
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [file, setFile] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandId, setBrandId] = useState('');
  const [cat, setCat] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [productData, setProductData] = useState({
   title: '',
   subTitle: '',
   price: '',
   offer: ''


  });

  const { title, subTitle, price, offer } = productData;

  /***********************************************onChange *******************************************/
      const handleProductChange = (e) => {
        setProductData({
          ...productData,
        [e.target.name] : e.target.value
        });
      }
       
      const handleImageChange = (e) => { 
        setFile([
          ...file,
          e.target.files[0]

        ])
      }
      

      function handleSizeChange(value) {
           setSize(
             value

           );
      }

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
    


    /************************************************ Submit **********************************************/  
        
    const submitHandler =  (e) => {
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

      for(let pic of file) {
       data.append('file', pic);
      }
      axios.post('/api/products/create', data).then(res => {
          if (res.status === 200) {
          swal('Great!', res.data.successMessage, 'success');
          }
          else {
            swal('Error', res.data.errorMessage, 'error');
          }
        })

      }
  
 
      //******************************************************** Modal ****************************************//

      const showModal = () => {
        setIsModalVisible(true);
      };
      const handleOk = () => {
        setIsModalVisible(false);
      };
      const handleCancel = () => {
        setIsModalVisible(false);
      };

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


  useEffect(() => {

    fetchCategories();
    fetchBrands();
    return () => {
    }
  }, [isModalVisible]);



 
    return (
        <div style = {{marginTop: '10px'}}>
               <Button type = 'primary' size = 'large' icon={ <PlusOutlined />} onClick = {showModal} >
              <span className = 'pb-2'>Create a Product</span>
            </Button>
         
          <Modal title="Product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <form onSubmit={submitHandler} className = 'text-center'>
            <h4 className = 'mb-5'>Create a Product</h4>
            <div className="form-group mt-4" style = {{paddingLeft: '62px'}}>
                    <input type="text" className="form-control mb-2" id = 'title' name = 'title' placeholder="Enter Your Product Title" onChange = {handleProductChange} />
                </div>
                <div className="form-group mt-4" style = {{paddingLeft: '62px'}}>
                    <input type="text" className="form-control mb-2" id = 'subTitle' name = 'subTitle' placeholder="Enter Your Product's Sub-Title" onChange = {handleProductChange} />
                </div>
                <div className="form-group mt-4" style = {{paddingLeft: '62px'}}>
                    <input type="Number" className="form-control mb-2" id = 'price' name = 'price' placeholder="Enter Product's Price in Rs." onChange = {handleProductChange} />
                </div>
               <div className = 'my-3'>
                <Select
                      mode="tags"
                      placeholder="Select Size.."
                      defaultValue={[]}
                      onChange={handleSizeChange}
                      style={{ width: '80%', marginLeft: '22px', marginTop: '6px' }}
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

                 <div className = 'my-3'>
                <Select
                      mode="tags"
                      placeholder="Select Color.."
                      defaultValue={[]}
                      onChange={handleColorChange}
                      style={{ width: '80%', marginLeft: '22px', marginTop: '6px' }}
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

                    <div className = 'ml-4'>
                     <Select
                            style={{ width: 380 }}
                            placeholder="Select a Brand"
                            onChange={handleBrandChange}
                           >
                        {
                          brands.map(brand => {
                            return(
                              <Option key = {brand._id}>{brand.name}</Option>

                            )
                          })
                           
                        }
                          
                    </Select>
                    </div>
                         
                 <div className="form-group mt-4" style = {{paddingLeft: '62px'}}>
                    <input type="Number" className="form-control mb-2" id = 'offer' name = 'offer' placeholder="Enter Offer" onChange = {handleProductChange} />
                </div>
                

                    <div className = 'my-3'>
                      <ReactQuill placeholder = "Product Description" theme="snow" value={description} onChange={setDescription}/>

                     </div>

                  <div className = 'my-3'>
                  <input type="file" name = 'file' multiple onChange = {handleImageChange}/>
                     <ul className = 'list-unstyled'>
                     {
                       file.length > 0 ?
                       file.map(pic => {
                         return(
                           <li key = {pic.name}>
                             {pic.name}
                           </li>

                         )
                       })
                       :
                       null
                     }
                     </ul>
                     {/* <button className = 'btn btn-outline-success' onClick = {uploadImage}>Upload</button> */}
                  </div>  
                   
                  

                   

                  <TreeSelect
                      showSearch
                      style={{ width: '100%' }}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="Please select"
                      allowClear
                      // multiple
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
                  <button type="submit" size = 'large' className="btn btn-outline-danger mt-4">Submit</button>
                  </form>
                  </Modal>

              </div>
    )
}
