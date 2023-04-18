import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const SingleCart = ({
  item,
  reRender,
  reRenderCart,
  setReRender,
  setReRenderCart,
  totalPrice,
  setTotalPrice,
}) => {
  const [qty, setQty] = useState(1);
  const removeQty = () => {
    if (qty <= item.qty && qty > 1) {
      setQty(qty - 1);
      setTotalPrice(totalPrice - Number(item.price));
    }
  };

  const addQty = () => {
    if (qty >= 1 && qty < item.qty) {
      setQty(qty + 1);
      setTotalPrice(totalPrice + Number(item.price));
    }
  };

  const deleteHandler = () => {
    let arr = JSON.parse(localStorage.getItem('cartProduct'));
    let filterEl = arr.filter((list) => list._id != item._id);
    arr = JSON.stringify(filterEl);
    localStorage.setItem('cartProduct', arr);
    setTotalPrice(totalPrice - qty * item.price);
    setReRender(!reRender);
    setReRenderCart(!reRenderCart);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '20px',
        border: '2px solid black',
        borderRadius: '20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '123%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '30%',
          // border: '2px solid black',
        }}
      >
        <Box
          component={'img'}
          src={item.image}
          alt={'img'}
          sx={{
            minWidth: '20%',
            maxWidth: '20%',
            margin: '15px 15px 15px 20px',
            // border: '1px solid black',
          }}
        ></Box>
        <Typography>{item.name}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <RemoveIcon
          sx={{ '&:hover': { cursor: 'pointer' } }}
          onClick={removeQty}
        />
        <Typography>{qty}</Typography>
        <AddIcon sx={{ '&:hover': { cursor: 'pointer' } }} onClick={addQty} />
      </Box>
      <Typography>${item.price}</Typography>
      <DeleteIcon
        sx={{ '&:hover': { cursor: 'pointer' }, marginRight: '20px' }}
        onClick={deleteHandler}
      />
    </Box>
  );
};

export default SingleCart;

// import { Box, Button, Divider, Typography } from "@mui/material";
// import { padding } from "@mui/system";
// import React, { useEffect, useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import DeleteIcon from "@mui/icons-material/Delete";

// const SingleCart = ({
//   item,
//   setReRender,
//   reRender,
//   totalPrice,
//   setTotalPrice,
//   reRenderCart,
//   setReRenderCart
// }) => {
//   const [qty, setQty] = useState(1);

//   const qtyChangeHandler = (type) => {
//     if (type == "add") {
//       if (qty < 5) {
//         setQty(qty + 1);
//         setTotalPrice(totalPrice + Number(item.price));
//       }
//     } else {
//       if (qty > 1) {
//         setQty(qty - 1);
//         setTotalPrice(totalPrice - Number(item.price));
//       }
//     }
//   };

//   const deleteHandler = () => {
//     let arr = JSON.parse(localStorage.getItem("cartProduct"));
//     let filteredEle = arr.filter((list) => list._id != item._id);
//     arr = JSON.stringify(filteredEle);
//     localStorage.setItem("cartProduct", arr);
//     setTotalPrice(totalPrice - qty * Number(item.price));
//     setReRender(!reRender);
//     setReRenderCart(!reRenderCart)
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         border: "2px solid black",
//         display: "flex",
//         justifyContent: "space-between",
//         padding: "1%",
//         alignItems: "center",
//         borderRadius: "10px",
//       }}
//     >
//       <Box
//         sx={{
//           width: "10%",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Box
//           component={"img"}
//           src={item.image}
//           alt={"image"}
//           sx={{ width: "40%" }}
//         />
//         <Typography
//           sx={{
//             textDecoration: "underLine",
//             color: "blue",
//             "&:hover": { cursor: "pointer" },
//           }}
//         >
//           {item.name}
//         </Typography>
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           width: "10%",
//         }}
//       >
//         <RemoveIcon
//           sx={{ "&:hover": { cursor: "pointer" } }}
//           onClick={() => qtyChangeHandler("minues")}
//         />
//         <Typography>{qty}</Typography>
//         <AddIcon
//           sx={{ "&:hover": { cursor: "pointer" } }}
//           onClick={() => qtyChangeHandler("add")}
//         />
//       </Box>
//       <Box>
//         <Typography>${item.price}</Typography>
//       </Box>
//       <Box>
//         <DeleteIcon
//           sx={{ "&:hover": { cursor: "pointer" } }}
//           onClick={deleteHandler}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default SingleCart;
