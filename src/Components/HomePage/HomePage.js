import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const HomePage = () => {
  const [prodArr, setProdArr] = useState([]);
  const [reRenderCart, setReRenderCart] = useState(false);
  let navigate = useNavigate();

  async function fetchProducts() {
    let options = {
      url: 'http://localhost:7000/product/allProduct',
      method: 'get',
      headers: { 'content-type': 'application/json' },
    };
    try {
      let response = await axios(options);
      if (response.status == 200) {
        if ((response.data.msg = 'fetched successfully')) {
          setProdArr(response.data.allData);
        }
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  const addToCart = (item) => {
    if (localStorage.getItem('cartProduct') == null) {
      let arr = [item];
      arr = JSON.stringify(arr);
      localStorage.setItem('cartProduct', arr);
      setReRenderCart(!reRenderCart);
    } else {
      let arr = JSON.parse(localStorage.getItem('cartProduct'));
      let filterEle = arr.filter((list) => list._id == item._id);
      if (filterEle.length) {
      } else {
        arr.push(item);
        arr = JSON.stringify(arr);
        localStorage.setItem('cartProduct', arr);
        setReRenderCart(!reRenderCart);
      }
    }
    // if (localStorage.getItem('cartProduct') == null) {
    //   let arr = [item];
    //   arr = JSON.stringify(arr);
    //   console.log(arr);
    //   localStorage.setItem('cartProduct', arr);
    //   setReRenderCart(!reRenderCart);
    // } else {
    //   console.log('first');
    //   let arr = JSON.parse(localStorage.getItem('cartProduct'));
    //   let filterEle = arr.filter((list) => list._id == item._id);
    //   if (filterEle.length) {
    //   } else {
    //     arr.push(item);
    //     arr = JSON.stringify(arr);
    //     localStorage.setItem('cartProduct', arr);
    //     setReRenderCart(!reRenderCart);
    //   }
    // }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '30px' }}>
      <Header reRenderCart={reRenderCart} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '30px',
          paddingLeft: '50px',
          paddingRight: '10px',
        }}
      >
        <Typography sx={{ fontSize: '30px' }}>Featured Products</Typography>
        <Box
          sx={{
            display: 'flex',
            columnGap: '30px',
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {prodArr.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '10px',
                  border: '2px solid black',
                  padding: '20px',
                  width: '15%',
                  '&:hover': { cursor: 'pointer' },
                }}
              >
                <Box
                  component={'img'}
                  src={item.image}
                  alt={'img'}
                  onClick={() => {
                    navigate(`/SingleProduct/${item.name}`);
                  }}
                />
                <Typography>Name: {item.name}</Typography>
                <Typography>Ratings: {item.ratings}</Typography>
                <Typography>Quantity: {item.qty}</Typography>
                <Typography>Price: {item.price}</Typography>
                {item.qty == 0 ? (
                  <Typography>Out of Stock</Typography>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      addToCart(item);
                    }}
                  >
                    Add to Cart
                  </Button>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;

// import { Box, Typography, Button } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import Header from '../Header/Header';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const HomePage = () => {
//   const [prodArr, setProdArr] = useState([]);
//   const [reRenderCart, setReRenderCart] = useState(false);
//   const navigate = useNavigate();

//   const fetchProducts = async () => {
//     let options = {
//       url: 'http://localhost:7000/product/allProduct',
//       method: 'get',
//       headers: {
//         'content-type': 'application/json',
//       },
//     };

//     try {
//       let response = await axios(options);
//       console.log(response);
//       if (response.status == 200) {
//         if (response.data.msg == 'fetched Successfully') {
//           setProdArr(response.data.allData);
//         } else {
//           alert(response.data.msg);
//         }
//       }
//     } catch (err) {
//       console.log('err', err);
//     }
//   };

//   const addToCart = (item) => {
//     if (localStorage.getItem('cartProduct') == null) {
//       let arr = [item];
//       arr = JSON.stringify(arr);
//       localStorage.setItem('cartProduct', arr);
//       setReRenderCart(!reRenderCart);
//     } else {
//       let arr = JSON.parse(localStorage.getItem('cartProduct'));
//       let filterEle = arr.filter((list) => list._id == item._id);
//       if (filterEle.length) {
//       } else {
//         arr.push(item);
//         arr = JSON.stringify(arr);
//         localStorage.setItem('cartProduct', arr);
//         setReRenderCart(!reRenderCart);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
//       <Header reRenderCart={reRenderCart} />
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           paddingLeft: '50px',
//           paddingRight: '10px',
//           rowGap: '30px',
//         }}
//       >
//         <Typography sx={{ fontSize: '30px' }}>Featured Product</Typography>
//         <Box
//           sx={{
//             display: 'flex',
//             width: '100%',
//             columnGap: '30px',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between',
//             rowGap: '30px',
//           }}
//         >
//           {prodArr.map((item, index) => {
//             return (
//               <Box
//                 key={index}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   width: '15%',
//                   border: '2px solid grey',
//                   padding: '20px',
//                   '&:hover': { cursor: 'pointer' },
//                 }}
//               >
//                 <Box
//                   component={'img'}
//                   src={item.image}
//                   alt={'img'}
//                   onClick={() => navigate(`/SingleProduct/${item.name}`)}
//                 />
//                 <Typography>Name : {item.name}</Typography>
//                 <Typography>Ratings : {item.ratings}</Typography>
//                 <Typography>Qty : $ {item.qty}</Typography>
//                 <Typography>Price : $ {item.price}</Typography>
//                 {item.qty == 0 ? (
//                   <Typography>Out of Stocks</Typography>
//                 ) : (
//                   <Button variant="contained" onClick={() => addToCart(item)}>
//                     Add to cart
//                   </Button>
//                 )}
//               </Box>
//             );
//           })}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;
