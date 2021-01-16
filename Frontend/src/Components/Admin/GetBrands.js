import { Button } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { CreateBrand } from './createBrand'
import { Layout } from './Layout'

export const GetBrands = () => {
    const [brands, setBrands] = useState([]);
    const [getBrand, setGetBrand] = useState('');
    const [editBrand, setEditBrand] = useState('');
    const [success, setSuccess] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);


    

    const handleBrandChange = (e) => {
        console.log(e.target.value);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        // axios.post('/api/categories/brands/create', {name : brand.toUpperCase()}).then(res => {
        //   if(res.status === 200) {
        //   swal('Great', res.data.successMessage, 'success');
        //     }
        //   else if(res.status === 201) {
        //     swal('Duplicate Error', res.data.errorMessage, 'error');
        //   }
        //   else {
        //     swal('Error', 'Brand not created. Please try again', 'error');
        //   }
        // })
      }
    
      const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };



  useEffect(() => {
      fetchBrands();
      return () => {
          
      }
  }, [success]);

            const fetchBrands = async() => {
                await axios.get('/api/categories/brands').then(res => {
                    setBrands(res.data.brands);
                })
            }

          

  const editHandler = (brandId) => {
       axios.get(`/api/categories/brands/${brandId}`).then(res => {
           setSuccess(true);
           setGetBrand(res.data.brand.name);
           setSuccess(false);
       })

  }
  
  const deleteHandler = async (brandId) => {
      await axios.delete(`/api/categories/brands/delete/${brandId}`).then(res => {
        if(res.status === 200) {
            setSuccess(true);
            swal('Great', res.data.successMessage, 'success');
            setSuccess(false)
         } else {
             swal('Error', 'Unable to delete brand. Please try again');
         }
      })
  }


  
    return (
        <Layout sidebar>
         <h3 className = 'text-center'>Brands</h3>
         <div className = 'float-right mb-3'>
             <CreateBrand/>
         </div>
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
               {
                   brands.map(brand => {
                       return(
                           
                        <tr key = {brand._id}>
                        <td>{brand.name}</td>
                        <td>
                        <button className='btn' style={{ textDecoration: 'none' }} onClick = {() => {editHandler(brand._id); showModal()}}><i className="fa fa-edit"></i></button>  &nbsp;
                        <Modal title="Edit Brand" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>     
                                              <form  className = 'text-center' onSubmit = {submitHandler}>
                                              <h4 className = 'mb-5'>Edit Your Brand</h4>
                                           
                                                  <div className="form-group mt-4" style = {{paddingLeft: '62px'}}> 
                                                      <input type="text" className="form-control mb-2 border" id = 'editedBrand' name = 'editedBrand' value = {getBrand} onChange = {handleBrandChange} />
                                                  </div> 
                                             
                                              <button type="submit" className="btn btn-outline-danger mt-4">Submit</button>
                                              </form>
                                              </Modal>
                        <button className='btn'><i className="fa fa-trash-alt" onClick = {() => deleteHandler(brand._id)}></i></button>
                        </td>
                        </tr>

                       )
                   })
               }
                
            </tbody>
            </table>
        </Layout>
    )
}