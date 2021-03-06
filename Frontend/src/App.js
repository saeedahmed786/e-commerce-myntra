import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { DefaultComp } from './Components/404'
import { About } from './Components/About'
import { AdminPanel } from './Components/Admin/AdminPanel'
import { CreateCategory } from './Components/Admin/CreateCategory'
import {EditProduct} from './Components/Admin/editProduct'
import { GetBrands } from './Components/Admin/GetBrands'
import { GetCategory } from './Components/Admin/GetCategories'
import { GetProducts } from './Components/Admin/GetProducts'
import { Layout } from './Components/Admin/Layout'
import { PriceRanges } from './Components/Admin/GetPriceRanges'
import { Users } from './Components/Admin/Users'
import { Home } from './Components/Homepage/Home'
import { Navbar } from './Components/Navbar'
import { Product } from './Components/Product'
import { Products } from './Components/Products'
import { THREEDCOMP } from './Components/3D'
import ThreeD from './Components/ThreeD'

 const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <div style = {{marginTop: '90px'}}>
      <Switch>
      <Route exact path = '/' component = {Home}/>
      <Route exact path = '/admin' component = {AdminPanel}/>
      <Route exact path = '/admin/all-categories' component = {GetCategory}/>
      <Route exact path = '/admin/all-brands' component = {GetBrands}/>
      <Route exact path = '/admin/create-category' component = {CreateCategory}/>
      <Route exact path = '/admin/all-price-range' component = {PriceRanges}/>
      <Route exact path = '/admin/get-products' component = {GetProducts}/>
      <Route exact path = '/admin/product/edit/:id' component = {EditProduct}/>
      <Route exact path = '/admin/users' component = {Users}/>                                                       
      <Route exact path = '/products/:id' component = {Products}/>
      <Route exact path = '/product/:id' component = {Product}/>
      <Route exact path = '/about' component = {About}/>
      <Route exact path = '/3d' component = {THREEDCOMP}/>
      <Route exact path = '/3d2' component = {ThreeD}/>
      <Route exact path = '/about' component = {About}/>
      <Route exact path = '/admin' component = {AdminPanel}/>
       <Route component = {DefaultComp}/>
      </Switch>
      </div>
      </BrowserRouter>
    </div>

  )
}

export default App;