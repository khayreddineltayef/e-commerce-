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
import { format } from 'date-fns';
function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {

 const [orders, setOrders] = React.useState([]);
 const user=useSelector((state)=>state.reducer.users)
 const isAuth=useSelector((state)=>state.reducer.isAuth)
 
   React.useEffect(() => {
     const userId = user._id; // replace with actual user ID
     axios.get(`/order/${userId}`).then((response) => {
       setOrders(response.data);

     });
   }, [user._id]);
   console.log(orders)
  return (
    <React.Fragment>
      {isAuth?<ProfileNav />:<Navbar />}
      <h1>Recent Orders</h1>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>order Id</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Paying Methode</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Country</TableCell>

          </TableRow>
        </TableHead>
 
        <TableBody>
  {orders.map((order) =>
   
      <TableRow key={order._id}>
       
        <TableCell> {format(new Date(order.createdAt), 'MM/dd/yyyy')}</TableCell>
        <TableCell>{order._id}</TableCell>
        <TableCell>{order.amount}</TableCell>
        <TableCell>{order.card}</TableCell>
        <TableCell                   style={{
                    color: order.status === 'pending' ? 'red' : 'green',
                  }}
>{order.status}</TableCell>
      <TableCell>{order.country}</TableCell> 
      </TableRow>

  )
  }
</TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
      <Footer />
    </React.Fragment>
  );
}
