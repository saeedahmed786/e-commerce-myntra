import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import 'antd/dist/antd.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Layout } from './Layout';
import swal from 'sweetalert';
import { Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';

const { Option } = Select;





export const GetCategory = (props) => {
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState(false);
  const [editCategory, setEditCategory] = useState('');
  const [editParentCat, setEditParentCat] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedCategory, setEditedCategory] = useState('');
  const [editCatId, setEditCatId] = useState('');


  const fetchCategories = () => {
    const response = axios.get('/api/categories').then(data => {
      setCategories(data.data);
    })
  }

  useEffect(() => {

    fetchCategories();


    return () => {

    }
  }, [success]);

  /********************************************************Editing Categories******************************/
    const getEditCatHandler = (editId) => {
      setEditCatId(editId);
      axios.get(`/api/categories/edit/${editId}`).then(res => {
        console.log(res);
            if(res.data.parentCat){
              setEditCategory(res.data.category.name);
            setEditParentCat(res.data.parentCat.name);
            } else {
              setEditCategory(res.data.category.name);
            }
      });
       

    }

    const editHandler = (e) => {
      e.preventDefault();
      axios.put(`/api/categories/update/${editCatId}`, {cat: editCategory}).then(res => {
            setSuccess(true);
            swal('Good Job!', res.data.successMessage, 'success');
            setSuccess(false);
          })
    }

  /********************************************************Deleting Categories******************************/

  const deleteHandler = (deleteId) => {
    axios.delete(`/api/categories/delete/${deleteId}`).then(res => {
      setSuccess(true);
      swal('Good Job!', res.data.successMessage, 'success');
      setSuccess(false);
    })
  }


    /********************************************************Editing Categories******************************/

  const handleCatChange = (e) => {
    setEditCategory(e.target.value);
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



  return (
    <Layout sidebar>
      <div className='text-center' >

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Main Categories</th>
              <th scope="col">Actions</th>
              <th scope="col">Sub-Categories</th>
            </tr>
          </thead>
          <tbody>

            {
              categories.map(cat => {
                return (
                  <>
                  <tr key={cat._id} style={{ borderBottom: '1px solid black' }}>
                  

                  
                    <th scope="col">{cat.name}</th>
                    <th>
                      <Link className='btn' style={{ textDecoration: 'none' }} onClick = {() => {getEditCatHandler(cat._id); showModal() }}><i className="fa fa-edit"></i></Link>
                                   {
                                     cat.children.length === 0 ?
                                     <button className='btn' onClick= {() => deleteHandler(cat._id)}><i className="fa fa-trash-alt"></i></button>
                                          :
                                          null

                                   }
                            
                    </th>
                    <table className="table subCat-table">
                      <tbody>

                        {
                          cat.children.length > 0 ?
                            cat.children.map(subCat => {
                              return (
                                  
                                <tr key={subCat._id}>
                                  <th>{subCat.name}</th>
                                  <th>

                                    
                                    <Link className='btn' style={{ textDecoration: 'none' }} onClick = {() => {getEditCatHandler(subCat._id); showModal() }}><i className="fa fa-edit"></i></Link>
                                          {
                                            subCat.children.length === 0 ?
                                            <button className='btn' onClick= {() => deleteHandler(subCat._id)}><i className="fa fa-trash-alt"></i></button>
                                                :
                                                null

                                          }

                                  </th>
                                  <table className = 'table subCat-table'>
                                    <tbody>
                                  {
                                    subCat.children.length > 0 ? 
                                    subCat.children.map(child => {
                                      return(
                                         <tr key = {child._id}>
                                           <th>{child.name}</th>
                                           <th>
                                           <button className='btn' style={{ textDecoration: 'none' }} onClick = {() => {getEditCatHandler(child._id); showModal() }}><i className="fa fa-edit"></i></button>
                                           <Modal title="Edit Categories" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>     
                                              <form  className = 'text-center' onSubmit = {editHandler}>
                                              <h4 className = 'mb-5'>Edit Your Category</h4>
                                              {
                                              editParentCat ? 
                                              <>
                                                <input disabled value={editParentCat} style={{ width: 347 }}>
                                                  </input>
                                                  <div className="form-group mt-4" style = {{paddingLeft: '62px'}}> 
                                                      <input type="text" className="form-control mb-2 border" id = 'editedCategory' name = 'editedCategory' value = {editCategory}  onChange = {handleCatChange} />
                                                  </div> 
                                                  </>  

                                                  :

                                                  <div className="form-group mt-4" style = {{paddingLeft: '62px'}}> 
                                                      <input type="text" className="form-control mb-2 border" id = 'editedCategory' name = 'editedCategory' value = {editCategory}  onChange = {handleCatChange} />
                                                  </div> 
                                                  
                                              }
                                             
                                                 
                                              <button type="submit" className="btn btn-outline-danger mt-4">Submit</button>
                                              </form>
                                              </Modal>

                                              <button className='btn' onClick= {() => deleteHandler(child._id)}><i className="fa fa-trash-alt"></i></button>
                                             
                                           </th>
                                         </tr>

                                      )

                                    }) :
                                    null
                                  }
                                  </tbody>
                                  </table>
                                  
                                </tr>
                               


                              )
                            }) : null
                        }
                      </tbody>
                      

                    </table>
                    
                  
                  
                  </tr>
                
                  </>
                  

                )
              })
            }

          </tbody>
        </table>






      </div>
    </Layout>
  )
}
