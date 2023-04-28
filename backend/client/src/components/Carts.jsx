import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ProfileNav from './ProfileNav';
import Navbar from './Navbar';
import Footer from './Footer';
import { Button, ButtonGroup } from '@mui/material';
import { format } from 'date-fns';
function preventDefault(event) {
  event.preventDefault();
}

export default function Carts() {
  const [carts, setCarts] = React.useState([]);
const user=useSelector((state)=>state.reducer.users)
const isAuth=useSelector((state)=>state.reducer.isAuth)

  React.useEffect(() => {
    const userId = user._id; 
    axios.get(`/cart/${userId}`).then((response) => {
      setCarts(response.data);
    });
  }, [user._id]);

  const updateCart = (cartId, productId, quantity) => {
    const newQuantity = prompt('Enter new quantity:', quantity);
    if (newQuantity !== null && newQuantity !== quantity) {
      axios.put(`/cart/${cartId}`, { productId, quantity: parseInt(newQuantity) })
        .then((response) => {
          // Update the carts state with the updated cart data
          const updatedCarts = carts.map((cart) => {
            if (cart._id === cartId) {
              const updatedProducts = cart.products.map((product) => {
                if (product.productId === productId) {
                  // If new quantity is zero, delete the product
                  if (parseInt(newQuantity) === 0) {
                    deleteProduct(cart._id,productId);
                  }
                  return {
                    ...product,
                    quantity: parseInt(newQuantity),
                  };
                }
                return product;
              }).filter((product) => product !== null); // Filter out deleted products
              return {
                ...cart,
                products: updatedProducts,
              };
            }
            return cart;
          });
          setCarts(updatedCarts);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const deleteProduct = (cartId, productId) => {
    axios.delete(`/cart/${cartId}/product/${productId}`)
      .then(() => {
        const updatedCarts = carts.map((cart) => {
          if (cart._id === cartId) {
            const updatedProducts = cart.products.filter((product) => product.productId !== productId);
            return {
              ...cart,
              products: updatedProducts,
            };
          }
          return cart;
        });
        setCarts(updatedCarts);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <React.Fragment>
      {isAuth?<ProfileNav />:<Navbar />}
      <h1>Recent Orders</h1>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>carte Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>productId</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Update/Delete</TableCell>

          </TableRow>
        </TableHead>
 
        <TableBody>
  {carts.map((cart) =>
    cart.products.map((product) => (
      <TableRow key={product.productId}>
       
        <TableCell> {format(new Date(cart.createdAt), 'MM/dd/yyyy')}</TableCell>
        <TableCell>{cart._id}</TableCell>
        <TableCell>{user.fullName}</TableCell>
        <TableCell>{product.productId}</TableCell>
        <TableCell>{product.quantity}</TableCell>
      <TableCell> <ButtonGroup variant="text" aria-label="text button group">
  <Button onClick={() => updateCart(cart._id, product.productId, product.quantity)}>Update</Button>
  <Button onClick={() => deleteProduct(cart._id,product.productId)}>Delete</Button>

</ButtonGroup> </TableCell> 
      </TableRow>
    ))
  )}
</TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
      <Footer />
    </React.Fragment>
  );
}
