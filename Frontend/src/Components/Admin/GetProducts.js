import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Layout } from './Layout'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';


const window = (new JSDOM('')).window
const DOMPurify = createDOMPurify(window)

export const GetProducts = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await axios.get('/api/products/get').then(res => {
            setProducts(res.data.products);
        });
    }

    useEffect(() => {
        fetchProducts();
        return () => {
            
        }
    }, []);
     
    const [isModalVisible, setIsModalVisible] = useState(false);

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
        <div>
          <Layout sidebar>
              <h1>Products</h1>
              <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Sub-title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Brand</th>
                    
                    {/* <th scope="col">Pictures</th> */}
                    </tr>
                </thead>
                <tbody>
                {
                    products.map(prod => {
                        return(
                            <tr key = {prod._id}>
                            <th scope="row">{prod.title}</th>
                            <td>{prod.subTitle}</td>
                            {/* <td>    { <div style = {{height: '100px' ,overflowY: 'scroll'}} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(prod.description) }} /> }</td> */}
                            <td>Rs.{prod.price}</td>
                            <td>{prod.category.name}</td>
                            <td>{prod.brand.name}</td>
                            {/* {
                                prod.productPictures.map(pic => {
                                    return (
                                        <td>
                                            <img src = {pic.img} alt = 'pic'></img>
                                        </td>
                                    )
                                })
                            } */}
                            </tr>

                        )
                    })
                }
                
                </tbody>
                </table>
          </Layout>
            
        </div>
    )
}
