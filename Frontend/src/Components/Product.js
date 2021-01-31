import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';



export const Product = (props) => {
    const productId = props.match.params.id;
    const [product, setProduct] = useState({});
    const [productColors, setProductColors] = useState([]);
    const [productSizes, setProductSizes] = useState([]);
    const [productPictures, setProductPictures] = useState([]);
    
    const getProducts = () => {
        const reponse =  axios.get(`/api/products/product/${productId}`).then(res => {
            setProduct(res.data);
            setProductColors(res.data.productColors);
            setProductPictures(res.data.productPictures);
            setProductSizes(res.data.productSizes);
        })
    }
    console.log(product);
    const dispatch = useDispatch('');

    useEffect(() => {
        getProducts();

        return () => {
            
        }
    }, [productId])

    return (
        <div>
         <div className = 'row'>
             <div className = 'col-md-8'>
             <h1>{product.title}</h1>      
             <div className = 'row'>
                 {
                     productPictures.map(pic => {
                         return(
                             <div className = 'col-md-6 mb-4 h-75'>
                             <Image.PreviewGroup>
                                    <Image
                                     src={pic.img}
                                        />
                                        
                               </Image.PreviewGroup>   
                             </div>
                          
                         )
                     })
                 }

                       
          
                 </div>
             </div>
             <div className="col-md-4">xcckjkcj</div>
         </div>
         
        
        </div>
    )
}
