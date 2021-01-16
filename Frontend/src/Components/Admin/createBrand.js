import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { PlusOutlined  } from '@ant-design/icons';
import axios from 'axios';
import swal from 'sweetalert';


export const CreateBrand = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [brand, setBrand] = useState('');


  const handleChange = (e) => {
    setBrand(e.target.value);
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('/api/categories/brands/create', {name : brand.toUpperCase()}).then(res => {
      console.log(res);
      if(res.status === 200) {
      swal('Great', res.data.successMessage, 'success');
        }
      else if(res.status === 201) {
        swal('Duplicate Error', res.data.errorMessage, 'error');
      }
      else {
        swal('Error', 'Brand not created. Please try again', 'error');
      }
    })
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
    <>
      <div>
      <Button className = 'mt-3' size = 'large' type="primary" icon = {<PlusOutlined/>} onClick={showModal}>
        Create Brand
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <form className = 'text-center' onSubmit = {submitHandler}>
          <div className="form-group mt-4" style = {{paddingLeft: '62px'}}>
                    <input type="text" className="form-control mb-2" id = 'brand' name = 'brand' placeholder="Enter Your Brand Title" onChange = {handleChange} />
                </div>            
          <button type = 'submit' className = 'btn btn-outline-danger mt-4'>Submit</button>
          </form>
      </Modal>
      </div>
    </>
  );
};
