import axios from 'axios';
import React, { useEffect, useState } from 'react'


export const Products = () => {
    const [categories, setCategories] = useState([]);
    const fetchMenCategories = async() => {
        await axios.get('/api/categories/men').then(data => {
          setCategories(data.data);
          console.log(data.data);
        });
      }
  useEffect(() => {
    fetchMenCategories();
    return () => {
      
    }
  }, [])

    return (
       <>
       <div className = 'text-center'>
          {
            categories.map(cat => {
              return(
                <>
                {
                  cat.category === 'WOMEN' ? 
                  <li>{cat.name}</li>
                  :
                  null
                }
                </>

              )
            }) 
          }
       {/* <h1>{categories.map(cat => {
          return(
              <li>
                  {cat.category}
              </li>
          )
      })}</h1> */}
      

       </div>
     
       </>
    )
}
