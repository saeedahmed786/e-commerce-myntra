import axios from 'axios';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';


export const Navbar = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    axios.get('/api/categories').then(data => {
      setCategories(data.data);
    })
  }

  useEffect(() => {

    fetchCategories();


    return () => {

    }
  }, []);
  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white">
        <Link className="navbar-brand" to="/">M</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto list-unstyle pt-3" style = {{fontSize: '12px'}}>
                       
                        
                    {
                      categories.map(data => {
                        return (
                          <li className='nav-item'> 
                          <div className="dropdown">
                            <Link className='nav-link' id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              {data.name}
                          </Link>
                       <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                         
                        <div className = 'row' style = {{width: '90vw'}}> 
                        {
                          data.children.length > 0 ?
                              data.children.map(sub => {

                                return (
                                  <>
                                  <div className = 'col-md-2 font-weight-bold drop-nav' id = 'sub-cat' key={data.id} style = {{fontSize: '12px'}}>
                                  <a className="dropdown-item text-danger" style = {{fontSize: '12px'}} key={sub.id} to="/">{sub.name}</a>
                                   
                                   {
                                     sub.children.length > 0 ?
                                     sub.children.map(child => {
                                       return(
                                       <p> 
                                       <Link to = {'/products/' + child._id} className='child'>{child.name}</Link>
                                       </p>
                                          
                                         
                                       )
                                     }) :
                                     null
                                   }
                                   </div>
                                  </>
                                   
                                )
                              }) : null

                        }   
                        

                          </div>  
                      </div>
                      </div>
                      </li>
                 
                        )
                      })

                    
                    }
                
            <form className="d-flex form-search">
            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
              <input className="form-control mr-sm-2" type="search" placeholder= "Search" aria-label="Search"/>
            </form>
            <li className = 'nav-item profile ml-5' style = {{fontWeight: 'normal'}}>
            <i className="fas fa-user" style = {{paddingLeft: '11px'}}/><br/><span style = {{fontSize: '14px'}}>Profile</span>

            </li>
            <li className = 'ml-3'>
            <i className="fas fa-ribbon" style = {{paddingLeft: '12px'}}></i><br/><span style = {{fontSize: '14px'}}>Wishlist</span>

            </li>
            <li className = 'ml-3'>
            <i className="fas fa-shopping-cart"></i><br/><span style = {{fontSize: '14px'}}>Bag</span>

            </li>
            </ul>
            </div>   

         
      </nav>


    </div>
  )
}
