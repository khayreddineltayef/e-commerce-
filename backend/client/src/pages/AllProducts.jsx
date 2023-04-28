import React from 'react'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import { Button, ButtonGroup } from '@mui/material'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import GetAllProducts from '../components/GetAllProducts'
import { useSelector } from 'react-redux'
import ProfileNav from '../components/ProfileNav'

const AllProducts = () => {
  const isAuth=useSelector((state)=>state.reducer.isAuth)
  return (
    <>
   {isAuth?<ProfileNav />: <Navbar />}
    <Announcement />
    
    <ButtonGroup   variant="text" aria-label="text button group">
 <Link to="/products/women"> <Button style={{color:'black'}}>Women's Products</Button> </Link>
 <Link to="/products/man"> <Button style={{color:'black'}}>Men's Products</Button> </Link>
 <Link to="/products/kids"> <Button style={{color:'black'}}>Kids's Products</Button> </Link>
 <Link to="/products/bebe"> <Button style={{color:'black'}}>Bebe's Products</Button> </Link>

</ButtonGroup>
<GetAllProducts />
    <Newsletter />
    <Footer />
    </>
  )
}

export default AllProducts