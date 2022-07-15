import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';


export const Orders = (props) => {
    let orders = props.orders;
    console.log(orders);
  return (
    <div className='customer-orders'>
        <Table sx={{ maxWidth:900 }} size='small' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reference</TableCell>
            <TableCell>Amount Paid</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {orders?.length > 0  ? 
            orders.map((order) => (
                <TableRow key={order.customer_reference}>
                    <TableCell>{order.customer_reference}</TableCell>
                    <TableCell>{order.order_value.formatted_with_symbol}</TableCell>
                    <TableCell>{order.status_fulfillment}</TableCell>
                </TableRow>
            ))
            : orders === undefined ?
            <TableRow className='dashboard-msg-box'>
                <TableCell></TableCell>
                <TableCell>
                    You don't have any orders at the moment.<br /><br />
                    <Link style={{textDecoration:'none'}} className='product-view-cart-btn' to="/shop">Shop Now</Link><br /><br />
                </TableCell>
                <TableCell></TableCell>
            </TableRow>
            :   <TableRow>
                    <TableCell>
                        <LinearProgress className="linear-loader" sx={{ color:'#b00000' }} color="inherit" />
                    </TableCell>
                    <TableCell>
                        <LinearProgress className="linear-loader" sx={{ color:'#b00000' }} color="inherit" />
                    </TableCell>
                    <TableCell>
                        <LinearProgress className="linear-loader" sx={{ color:'#b00000' }} color="inherit" />
                    </TableCell>
                </TableRow>
            }
        </TableBody>
        </Table>
    </div>
  )
}

export default Orders;
