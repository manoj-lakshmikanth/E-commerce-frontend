import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import CheckOutCard from './CheckOutCard';

const Checkout = () => {
  const [percentage, setPercentage] = useState(25);
  const [options, setOptions] = useState('shipping');
  const [shippingValues, setshippingValues] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [payMethod, setPayMethod] = useState('Cash On Delivery');
  const [cartProduct, setCartProduct] = useState([]);
  const [checkoutItem, setCheckoutItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [otherPrices, setOtherPrices] = useState({
    shippingCost: '$2',
    tax: '$4',
  });

  const navigate = useNavigate();

  function paymentHandler() {
    setOptions('');
    setPercentage(100);
  }

  async function shippingHandler() {
    let options = {
      url: 'http://localhost:7000/orders',
      method: 'post',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
      data: {
        cartItem: cartProduct,
        checkOutProduct: checkoutItem,
        paymentMethod: payMethod,
        address: shippingValues,
        totalAmount: totalPrice,
      },
    };
    try {
      await axios(options);
      setOptions('payment');
      setPercentage(75);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('cartProduct') == null) {
      setCartProduct([]);
    } else {
      let arr = JSON.parse(localStorage.getItem('cartProduct'));
      let checkPro = JSON.parse(localStorage.getItem('checkoutItem'));
      setCartProduct(arr);
      setCheckoutItem(checkPro);
      let totalPrice = checkPro.reduce(
        (val, item) => val + Number(item.price.substr(1)),
        0
      );
      setTotalPrice(totalPrice);
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
      <Header />
      <Box
        sx={{
          display: 'flex',
          paddingX: '5%',
        }}
      >
        <Typography
          sx={{
            width: '25%',
            borderBottom:
              percentage >= 25 ? '5px solid rgb(240,128,0)' : '5px solid gray',
            color: 'rgb(240,128,0)',
            fontSize: '20px',
          }}
        >
          Sign In
        </Typography>
        <Typography
          sx={{
            width: '25%',
            borderBottom:
              percentage >= 50 ? '5px solid rgb(240,128,0)' : '5px solid gray',
            color: 'rgb(240,128,0)',
            fontSize: '20px',
          }}
        >
          Shipping
        </Typography>
        <Typography
          sx={{
            width: '25%',
            borderBottom:
              percentage >= 75 ? '5px solid rgb(240,128,0)' : '5px solid gray',
            color: 'rgb(240,128,0)',
            fontSize: '20px',
          }}
        >
          Payment
        </Typography>
        <Typography
          sx={{
            width: '25%',
            borderBottom:
              percentage >= 100 ? '5px solid rgb(240,128,0)' : '5px solid gray',
            color: 'rgb(240,128,0)',
            fontSize: '20px',
          }}
        >
          Place Order
        </Typography>
      </Box>
      <Box>
        {options == 'shipping' ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '20px',
              paddingTop: '40px',
              paddingX: '35%',
            }}
          >
            <Typography
              sx={{ color: 'rgb(240,128,0)', fontSize: '30px', margin: 'auto' }}
            >
              Shipping Address
            </Typography>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}
            >
              <TextField
                id="outlined-basic"
                label="Full Name"
                variant="outlined"
                value={shippingValues.fullName}
                onChange={(e) => {
                  setshippingValues({
                    ...shippingValues,
                    fullName: e.target.value,
                  });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                value={shippingValues.address}
                onChange={(e) => {
                  setshippingValues({
                    ...shippingValues,
                    address: e.target.value,
                  });
                }}
              />
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                value={shippingValues.city}
                onChange={(e) => {
                  setshippingValues({
                    ...shippingValues,
                    city: e.target.value,
                  });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Postal Code"
                variant="outlined"
                value={shippingValues.postalCode}
                onChange={(e) => {
                  setshippingValues({
                    ...shippingValues,
                    postalCode: e.target.value,
                  });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Country"
                variant="outlined"
                value={shippingValues.country}
                onChange={(e) => {
                  setshippingValues({
                    ...shippingValues,
                    country: e.target.value,
                  });
                }}
              />
              <Button variant="contained" onClick={shippingHandler}>
                Submit
              </Button>
            </Box>
          </Box>
        ) : options == 'payment' ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '20px',
              paddingTop: '40px',
              paddingX: '40%',
            }}
          >
            <Typography
              sx={{
                color: 'rgb(248,120,0)',
                fontSize: '30px',
                margin: 'auto',
              }}
            >
              Payment Options
            </Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Cash On Delivery"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Cash On Delivery"
                  control={<Radio />}
                  label="Cash On Delivery"
                  onChange={() => {
                    setPayMethod('Cash On Delivery');
                  }}
                />
                <FormControlLabel
                  value="Phone pe"
                  control={<Radio />}
                  label="Phone pe"
                  onChange={() => {
                    setPayMethod('Phone pe');
                  }}
                />
                <FormControlLabel
                  value="Google pay"
                  control={<Radio />}
                  label="Google pay"
                  onChange={() => {
                    setPayMethod('Google pay');
                  }}
                />
              </RadioGroup>
            </FormControl>
            <Button variant="contained" onClick={paymentHandler}>
              Submit
            </Button>
          </Box>
        ) : (
          <Box sx={{ paddingX: '5%' }}>
            <Typography
              sx={{
                color: 'rgb(248,120,0)',
                fontSize: '30px',
                margin: 'auto',
              }}
            >
              Order Preview
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '100px',
                  // border: '1px solid black',
                  width: '70%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '25px',
                  }}
                >
                  <Box
                    sx={{
                      border: '1px solid black',
                      borderRadius: '20px',
                      // paddingX: '2%',
                      padding: '15px 20px 15px 20px',
                    }}
                  >
                    <Typography
                      sx={{ color: 'rgb(240,128,0)', fontSize: '20px' }}
                    >
                      Shipping
                    </Typography>
                    <Typography>Name: {shippingValues.fullName}</Typography>
                    <Typography>Address: {shippingValues.address}</Typography>
                    <Typography
                      sx={{
                        textDecoration: 'underline',
                        color: 'blue',
                        '&:hover': { cursor: 'pointer' },
                      }}
                      onClick={() => {
                        setOptions('shipping');
                        setPercentage(50);
                      }}
                    >
                      Edit
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      border: '1px solid black',
                      borderRadius: '20px',
                      padding: '15px 20px 15px 20px',
                    }}
                  >
                    <Typography
                      sx={{ color: 'rgb(240,128,0)', fontSize: '20px' }}
                    >
                      Payment
                    </Typography>
                    <Typography>Payment Method: {payMethod} </Typography>
                    <Typography
                      sx={{
                        textDecoration: 'underline',
                        color: 'blue',
                        '&:hover': { cursor: 'pointer' },
                      }}
                      onClick={() => {
                        setOptions('payment');
                        setPercentage(75);
                      }}
                    >
                      Edit
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      border: '1px solid black',
                      borderRadius: '20px',
                      padding: '15px 20px 15px 20px',
                    }}
                  >
                    <Typography
                      sx={{ color: 'rgb(240,128,0)', fontSize: '20px' }}
                    >
                      Items
                    </Typography>
                    {cartProduct.map((items, index) => {
                      return (
                        <CheckOutCard
                          key={index}
                          items={items}
                          checkoutItem={checkoutItem}
                        />
                      );
                    })}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  width: '25%',
                  border: '1px solid black',
                  borderRadius: '20px',
                  padding: '15px 20px 15px 20px',
                  height: '50%',
                }}
              >
                <Typography sx={{ color: 'rgb(240,128,0)', fontSize: '20px' }}>
                  Order Summary
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '15px',
                  }}
                >
                  <Typography>Items: </Typography>
                  <Typography>${totalPrice}</Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '15px',
                  }}
                >
                  <Typography>Shipping: </Typography>
                  <Typography>{otherPrices.shippingCost}</Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '15px',
                  }}
                >
                  <Typography>Tax: </Typography>
                  <Typography>{otherPrices.tax}</Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '15px',
                  }}
                >
                  <Typography>Order total: </Typography>
                  <Typography>
                    $
                    {totalPrice +
                      Number(otherPrices.shippingCost.substr(1)) +
                      Number(otherPrices.tax.substr(1))}
                  </Typography>
                </Box>
                <Divider />
                <Button
                  variant="contained"
                  sx={{ marginTop: '10px', margin: '18px 50px 2px 100px' }}
                  onClick={() => {
                    alert('Order Placed Succesfully');
                    navigate('/');
                    localStorage.setItem('cartProduct', JSON.stringify([]));
                    localStorage.setItem('checkoutItem', JSON.stringify([]));
                  }}
                >
                  Place Order
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default Checkout;

// import {
//   Box,
//   Button,
//   Divider,
//   Radio,
//   TextField,
//   Typography,
// } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import Header from '../Header/Header';
// import CheckOutCard from './CheckOutCard';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Checkout = () => {
//   const navigate = useNavigate();
//   const [percentage, setPercentage] = useState(50);
//   const [option, setOption] = useState('shipping');
//   const [shippingValues, setShippingValues] = useState({
//     name: '',
//     address: '',
//     city: '',
//     postal: '',
//     country: '',
//   });
//   const [payMethod, setPayMethod] = useState('paypal');
//   const [cartProduct, setCartProduct] = useState([]);
//   const [checkOutItems, setCheckOutItems] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);

//   const continueHandler = () => {
//     setPercentage(75);
//     setOption('payment');
//   };

//   const changePaymentMethod = (type) => {
//     setPayMethod(type);
//     setPercentage(100);
//     setOption('placeOrder');
//   };

//   const addressEditHandler = () => {
//     setOption('shipping');
//     setPercentage(50);
//   };

//   const paymentEditHandler = () => {
//     setOption('payment');
//     setPercentage(75);
//   };

//   useEffect(() => {
//     if (localStorage.getItem('cartProduct') == null) {
//       setCartProduct([]);
//     } else {
//       let arr = JSON.parse(localStorage.getItem('cartProduct'));
//       let checkPro = JSON.parse(localStorage.getItem('checkoutItem'));
//       console.log(checkPro);
//       let totalPrice = checkPro.reduce(
//         (acc, cur) => acc + Number(cur.price.substr(1)),
//         0
//       );
//       setTotalAmount(totalPrice);
//       setCartProduct(arr);
//       setCheckOutItems(checkPro);
//     }
//   }, []);

//   const submitHandler = async () => {
//     let options = {
//       url: 'http://localhost:7000/orders',
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//         authorization: `Bearer ${localStorage.getItem('userToken')}`,
//       },
//       data: {
//         cartItem: cartProduct,
//         checkOutItem: checkOutItems,
//         paymentMethod: payMethod,
//         address: shippingValues,
//         totalAmount: totalAmount,
//       },
//     };

//     try {
//       let response = await axios(options);
//       console.log(response);

//       if (response.status == 200) {
//         if (response.data.msg == 'inserted') {
//           alert('Order PLaced Successfull');
//           navigate('/');
//         } else {
//           alert(response.data.msg);
//           navigate('/');
//           return;
//         }
//       }
//     } catch (err) {
//       console.log('err', err);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
//       <Header />
//       <Box sx={{ paddingX: '5%', width: '90%', display: 'flex' }}>
//         <Typography
//           sx={{
//             width: '25%',
//             borderBottom:
//               percentage >= 25 ? '5px solid rgb(240,128,0)' : '5px solid grey',
//             color: 'rgb(240,128,0)',
//             fontSize: '20px',
//             '&:hover': { cursor: 'pointer' },
//           }}
//         >
//           Sign in
//         </Typography>
//         <Typography
//           sx={{
//             width: '25%',
//             borderBottom:
//               percentage >= 50 ? '5px solid rgb(240,128,0)' : '5px solid grey',
//             color: 'rgb(240,128,0)',
//             fontSize: '20px',
//             '&:hover': { cursor: 'pointer' },
//           }}
//         >
//           Shipping
//         </Typography>
//         <Typography
//           sx={{
//             width: '25%',
//             borderBottom:
//               percentage >= 75 ? '5px solid rgb(240,128,0)' : '5px solid grey',
//             color: 'rgb(240,128,0)',
//             fontSize: '20px',
//             '&:hover': { cursor: 'pointer' },
//           }}
//         >
//           Payment
//         </Typography>
//         <Typography
//           sx={{
//             width: '25%',
//             borderBottom:
//               percentage >= 100 ? '5px solid rgb(240,128,0)' : '5px solid grey',
//             color: 'rgb(240,128,0)',
//             fontSize: '20px',
//             '&:hover': { cursor: 'pointer' },
//           }}
//         >
//           Place Order
//         </Typography>
//       </Box>

//       {/* address box */}
//       {option == 'shipping' ? (
//         <Box
//           sx={{
//             alignSelf: 'center',
//             display: 'flex',
//             flexDirection: 'column',
//             rowGap: '10px',
//           }}
//         >
//           <Typography sx={{ fontSize: '25px', fontWeight: 'bold' }}>
//             Shipping Address
//           </Typography>
//           <Box>
//             <Typography>Full Name</Typography>
//             <TextField
//               id="outlined-basic"
//               label="Full Name"
//               variant="outlined"
//               value={shippingValues.name}
//               onChange={(e) =>
//                 setShippingValues({ ...shippingValues, name: e.target.value })
//               }
//             />
//           </Box>
//           <Box>
//             <Typography>Address</Typography>
//             <TextField
//               id="outlined-basic"
//               label="Address"
//               variant="outlined"
//               value={shippingValues.address}
//               onChange={(e) =>
//                 setShippingValues({
//                   ...shippingValues,
//                   address: e.target.value,
//                 })
//               }
//             />
//           </Box>
//           <Box>
//             <Typography>City</Typography>
//             <TextField
//               id="outlined-basic"
//               label="City"
//               variant="outlined"
//               value={shippingValues.city}
//               onChange={(e) =>
//                 setShippingValues({ ...shippingValues, city: e.target.value })
//               }
//             />
//           </Box>
//           <Box>
//             <Typography>Postal Code</Typography>
//             <TextField
//               id="outlined-basic"
//               label="Postal Code"
//               variant="outlined"
//               value={shippingValues.postal}
//               onChange={(e) =>
//                 setShippingValues({ ...shippingValues, postal: e.target.value })
//               }
//             />
//           </Box>
//           <Box>
//             <Typography>Country</Typography>
//             <TextField
//               id="outlined-basic"
//               label="Country"
//               variant="outlined"
//               value={shippingValues.country}
//               onChange={(e) =>
//                 setShippingValues({
//                   ...shippingValues,
//                   country: e.target.value,
//                 })
//               }
//             />
//           </Box>
//           <Button variant="contained" onClick={continueHandler}>
//             Continue
//           </Button>
//         </Box>
//       ) : option == 'payment' ? (
//         <Box
//           sx={{
//             alignSelf: 'center',
//             display: 'flex',
//             flexDirection: 'column',
//             rowGap: '5px',
//           }}
//         >
//           <Typography sx={{ fontSize: '25px', fontWeight: 'bold' }}>
//             Payment Method
//           </Typography>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Radio
//               name="radio-buttons"
//               inputProps={{ 'aria-label': 'B' }}
//               checked={payMethod == 'paypal' ? true : false}
//               onChange={() => changePaymentMethod('paypal')}
//             />
//             <Typography>PayPal</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Radio
//               name="radio-buttons"
//               inputProps={{ 'aria-label': 'B' }}
//               checked={payMethod == 'stripe' ? true : false}
//               onChange={() => changePaymentMethod('stripe')}
//             />
//             <Typography>Stripe</Typography>
//           </Box>
//         </Box>
//       ) : (
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             rowGap: '5px',
//             paddingX: '5%',
//           }}
//         >
//           <Typography sx={{ fontSize: '26px', fontWeight: 'bold' }}>
//             Preview Order
//           </Typography>
//           <Box sx={{ width: '100%', display: 'flex', columnGap: '20px' }}>
//             <Box
//               sx={{
//                 width: '70%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 rowGap: '30px',
//                 borderRadius: '20px',
//               }}
//             >
//               <Box
//                 sx={{
//                   border: '1px solid grey',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   rowGap: '5px',
//                   padding: '2%',
//                   borderRadius: '20px',
//                 }}
//               >
//                 <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
//                   Shipping
//                 </Typography>
//                 <Box sx={{ display: 'flex', columnGap: '5px' }}>
//                   <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
//                     Name:
//                   </Typography>
//                   <Typography>{shippingValues.name}</Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', columnGap: '5px' }}>
//                   <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
//                     Address:
//                   </Typography>
//                   <Typography>{shippingValues.address}</Typography>
//                 </Box>
//                 <Typography
//                   sx={{
//                     color: 'blue',
//                     textDecoration: 'underLine',
//                     '&:hover': { cursor: 'pointer' },
//                   }}
//                   onClick={addressEditHandler}
//                 >
//                   Edit
//                 </Typography>
//               </Box>
//               <Box
//                 sx={{
//                   border: '1px solid grey',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   rowGap: '5px',
//                   padding: '2%',
//                   borderRadius: '20px',
//                 }}
//               >
//                 <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
//                   Payment
//                 </Typography>
//                 <Box sx={{ display: 'flex', columnGap: '5px' }}>
//                   <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
//                     Method:
//                   </Typography>
//                   <Typography>{payMethod}</Typography>
//                 </Box>
//                 <Typography
//                   sx={{
//                     color: 'blue',
//                     textDecoration: 'underLine',
//                     '&:hover': { cursor: 'pointer' },
//                   }}
//                   onClick={paymentEditHandler}
//                 >
//                   Edit
//                 </Typography>
//               </Box>
//               <Box
//                 sx={{
//                   border: '1px solid grey',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   rowGap: '5px',
//                   padding: '2%',
//                   borderRadius: '20px',
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     fontSize: '20px',
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   items
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     rowGap: '5px',
//                     borderRadius: '20px',
//                   }}
//                 >
//                   {cartProduct.map((item, index) => {
//                     return (
//                       <CheckOutCard
//                         key={index}
//                         item={item}
//                         checkOutItems={checkOutItems}
//                       />
//                     );
//                   })}
//                 </Box>
//               </Box>
//             </Box>
//             <Box
//               sx={{
//                 width: '30%',
//                 border: '1px solid grey',
//                 padding: '1%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 rowGap: '10px',
//                 borderRadius: '20px',
//                 height: 'fit-content',
//               }}
//             >
//               <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
//                 Order Summary
//               </Typography>
//               <Box
//                 sx={{
//                   width: '100%',
//                   padding: '1%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   rowGap: '10px',
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     paddingX: '5%',
//                   }}
//                 >
//                   <Typography>items</Typography>
//                   <Typography>${totalAmount}</Typography>
//                 </Box>
//                 <Divider />
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     paddingX: '5%',
//                   }}
//                 >
//                   <Typography>Shipping</Typography>
//                   <Typography>$0.00</Typography>
//                 </Box>
//                 <Divider />
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     paddingX: '5%',
//                   }}
//                 >
//                   <Typography>Tax</Typography>
//                   <Typography>$18.00</Typography>
//                 </Box>
//                 <Divider />
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     paddingX: '5%',
//                   }}
//                 >
//                   <Typography>Order Total</Typography>
//                   <Typography>${totalAmount + 18}</Typography>
//                 </Box>
//                 <Divider />
//                 <Button variant="contained" onClick={submitHandler}>
//                   Place Order
//                 </Button>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Checkout;
