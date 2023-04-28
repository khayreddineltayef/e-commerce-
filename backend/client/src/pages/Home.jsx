import React from 'react'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Categories from '../components/Categories'

import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import ProductsForHome from '../components/ProductsForHome'
import NewProductAnnouncement from '../components/NewProductAnnouncement'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import ProductList from '../components/ProductList'
import { useSelector } from 'react-redux'
import ProfileNav from '../components/ProfileNav'
import PromProductsHome from '../components/PromProductsHome'
import AnnouncementForSolde from '../components/AnnouncementForSolde'
// import ProfileNav from '../components/ProfileNav'



const Home = () => {
 const isAuth=useSelector ((state)=>state.reducer.isAuth)

  return (
    <>
    
   {isAuth?<ProfileNav />:<Navbar />}
   <Announcement />
    <Slider />
    <Categories />
    <NewProductAnnouncement />
    <ProductList />
    <ProductsForHome />
    <Link to="/products/"><Button  style={{marginLeft:"650px",width:"300px",textDecoration:"none",marginBottom:"10px"}}variant="contained">DISCOVER ALL PRODUCTS</Button></Link>
    <AnnouncementForSolde/>
    <PromProductsHome />
    <Link to="/promo"><Button  style={{marginLeft:"650px",width:"300px",textDecoration:"none"}}variant="contained">DISCOVER ALL OUR SOLDES </Button></Link>
    <Newsletter />
    <Footer />
</>
  )
}

export default Home