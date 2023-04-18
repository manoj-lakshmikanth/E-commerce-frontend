import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import SingleCart from './SingleCart';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [reRender, setReRender] = useState(true);
  const [reRenderCart, setreRenderCart] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const prodRef = useRef();

  function checkout() {
    let a = prodRef.current.outerText.split('\n');
    let arr = [];
    let obj = {};
    for (let i = 0; i < a.length; i++) {
      if (a[i].startsWith('Shirt')) {
        obj.name = a[i];
      } else if (a[i] == '') {
      } else if (a[i].startsWith('$')) {
        obj.price = a[i];
        arr.push(obj);
        obj = {};
      } else {
        obj.qty = a[i];
      }
    }
    console.log(arr);
    localStorage.setItem('checkoutItem', JSON.stringify(arr));
    navigate('/Checkout');
  }

  useEffect(() => {
    if (localStorage.getItem('cartProduct') == null) {
      setCart([]);
    } else {
      let arr = JSON.parse(localStorage.getItem('cartProduct'));
      setCart(arr);
      let totalPrice = arr.reduce((val, item) => val + Number(item.price), 0);
      setTotalPrice(totalPrice);
    }
  }, [reRender]);

  useEffect(() => {
    if (localStorage.getItem('cartProduct') == null) {
      setCart([]);
    } else {
      let arr = JSON.parse(localStorage.getItem('cartProduct'));
      setCart(arr);
      let totalAmount = arr.reduce((acc, item) => acc + Number(item.price), 0);
      setTotalPrice(totalAmount);
    }
  }, [reRender]);
  return (
    <Box>
      <Header reRenderCart={reRenderCart} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          padding: '10px 10px 0px 50px ',
          rowGap: '20px',
          // border: '1px solid blue',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4">Shopping Cart</Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            // border: '1px solid red',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              // border: '1px solid blue',
              width: '70%',
            }}
          >
            {cart.length == 0 ? (
              <Box sx={{ width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    border: '1px solid black',
                    background: 'lightblue',
                    alignItems: 'center',
                    borderRadius: '20px',
                    height: '50px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      paddingLeft: '20px',
                      // border: '1px solid black',
                    }}
                  >
                    <Typography>Cart is empty, </Typography>
                    <Typography
                      sx={{
                        color: 'blue',
                        textDecoration: 'underLine',
                        paddingLeft: '10px',
                        '&:hover': { cursor: 'pointer' },
                      }}
                      onClick={() => {
                        navigate('/');
                      }}
                    >
                      Go Shopping
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box ref={prodRef}>
                {cart.map((item, index) => {
                  return (
                    <SingleCart
                      item={item}
                      key={index}
                      reRender={reRender}
                      reRenderCart={reRenderCart}
                      setReRender={setReRender}
                      setReRenderCart={setreRenderCart}
                      totalPrice={totalPrice}
                      setTotalPrice={setTotalPrice}
                    />
                  );
                })}
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              border: '2px solid black',
              borderRadius: '20px',
              rowGap: '20px',
              height: '50%',
              padding: '10px 15px 15px 15px',
              width: '20%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                // padding: '15px 15px 15px 15px',
              }}
            >
              <Typography> Subtotal : </Typography>
              <Typography>$ {totalPrice}</Typography>
            </Box>
            <Divider />
            <Button
              sx={{
                margin: 'auto',
                // display: 'flex',
                // justifyContent: 'center',
              }}
              variant="contained"
              onClick={checkout}
            >
              Proceed to checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;

// import { Box, Button, Divider, Typography } from '@mui/material';
// import { padding } from '@mui/system';
// import React, { useEffect, useRef, useState } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import Header from '../Header/Header';
// import SingleCart from './SingleCart';

// const CartPage = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [reRender, setReRender] = useState(true);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const prodRef = useRef();
//   const [reRenderCart, setReRenderCart] = useState(true);

//   const checkOut = () => {
//     let a = prodRef.current.outerText.split('\n');
//     console.log(a);
//     let arr = [];
//     let obj = {};
//     for (let i = 0; i < a.length; i++) {
//       if (a[i].startsWith('Shirt')) {
//         obj.name = a[i];
//       } else if (a[i] == '') {
//       } else if (a[i].startsWith('$')) {
//         obj.price = a[i];
//         arr.push(obj);
//         obj = {};
//       } else {
//         obj.qty = a[i];
//       }
//     }
//     localStorage.setItem('checkoutItem', JSON.stringify(arr));
//     navigate('/Checkout');
//   };

//   useEffect(() => {
//     if (localStorage.getItem('cartProduct') == null) {
//       setCart([]);
//     } else {
//       let arr = JSON.parse(localStorage.getItem('cartProduct'));
//       setCart(arr);
//       let totalAmount = arr.reduce((acc, item) => acc + Number(item.price), 0);
//       setTotalPrice(totalAmount);
//     }
//   }, [reRender]);

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
//       <Header reRenderCart={reRenderCart} />
//       <Typography
//         sx={{ fontSize: '25px', fontWeight: 'bold', paddingLeft: '50px' }}
//       >
//         Shopping Cart
//       </Typography>
//       <Box
//         sx={{
//           paddingLeft: '50px',
//           paddingRight: '50px',
//           width: '93%',
//           display: 'flex',
//           columnGap: '10px',
//         }}
//       >
//         <Box
//           sx={{
//             width: '75%',
//           }}
//         >
//           {cart.length == 0 ? (
//             <Box
//               sx={{
//                 backgroundColor: 'rgb(207,244,252)',
//                 paddingLeft: '20px',
//                 width: '97%',
//                 display: 'flex',
//                 columnGap: '2px',
//                 paddingY: '10px',
//                 borderRadius: '10px',
//               }}
//             >
//               <Typography>Cart is empty,</Typography>
//               <Typography
//                 sx={{
//                   textDecoration: 'underLine',
//                   color: 'blue',
//                   '&:hover': { cursor: 'pointer' },
//                 }}
//                 onClick={() => navigate('/')}
//               >
//                 Go Shopping
//               </Typography>
//             </Box>
//           ) : (
//             <Box
//               sx={{
//                 width: '97%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 rowGap: '20px',
//               }}
//               ref={prodRef}
//             >
//               {cart.map((item, index) => {
//                 return (
//                   <SingleCart
//                     key={index}
//                     item={item}
//                     reRender={reRender}
//                     setReRender={setReRender}
//                     setTotalPrice={setTotalPrice}
//                     totalPrice={totalPrice}
//                     setReRenderCart={setReRenderCart}
//                     reRenderCart={reRenderCart}
//                   />
//                 );
//               })}
//             </Box>
//           )}
//         </Box>
//         <Box
//           sx={{
//             width: '25%',
//             display: 'flex',
//             flexDirection: 'column',
//             border: '1px solid grey',
//             padding: '2%',
//             rowGap: '10px',
//             borderRadius: '20px',
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-evenly',
//               alignItems: 'center',
//             }}
//           >
//             <Typography sx={{ fontSize: '25px', fontWeight: 'bold' }}>
//               Subtotal (0 items) :
//             </Typography>
//             <Typography sx={{ fontSize: '25px', fontWeight: 'bold' }}>
//               ${totalPrice}
//             </Typography>
//           </Box>
//           <Divider />
//           <Button variant="contained" onClick={checkOut}>
//             Proceed To CheckOut
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default CartPage;
