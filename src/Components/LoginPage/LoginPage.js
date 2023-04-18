import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const LoginPage = () => {
  const [userVal, setUserVal] = useState({ email: '', password: '' });
  async function submitHandler() {
    let options = {
      url: 'http://localhost:7000/user/login',
      method: 'post',
      headers: { 'content-type': 'application/json' },
      data: userVal,
    };
    try {
      let response = await axios(options);
      console.log(response);
      console.log(response.data.token);
      console.log(response.data.findData);
      if (response.status === 200) {
        if (response.data.message === 'Login Successful') {
          localStorage.setItem('userToken', response.data.token);
          localStorage.setItem(
            'userDetails',
            JSON.stringify(response.data.findData)
          );
          alert(response.data.message);
          navigate('/');
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  let navigate = useNavigate();
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '30px' }}>
        <Header />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: '30px',
            marginTop: '50px',
          }}
        >
          <Typography variant="h4">Sign In</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '30px',
              width: '20%',
            }}
          >
            <TextField
              id="outlined-basic"
              type={'text'}
              label="Email"
              variant="outlined"
              size="small"
              // value={userVal.email}
              onChange={(e) => {
                setUserVal({ ...userVal, email: e.target.value });
              }}
            />
            <TextField
              id="outlined-basic"
              type={'password'}
              label="Password"
              variant="outlined"
              size="small"
              // value={userVal.password}
              onChange={(e) => {
                setUserVal({ ...userVal, password: e.target.value });
              }}
            />
          </Box>
          <Button variant="contained" onClick={submitHandler}>
            Sign In
          </Button>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              columnGap: '20px',
            }}
          >
            <Typography>New Customer?</Typography>
            <Typography
              sx={{
                color: 'blue',
                textDecoration: 'underline',
                '&:hover': { cursor: 'pointer' },
              }}
              onClick={() => {
                navigate('/SignUpPage');
              }}
            >
              Create new account
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              columnGap: '20px',
            }}
          >
            <Typography>Forgot password?</Typography>
            <Typography
              sx={{
                color: 'blue',
                textDecoration: 'underline',
                '&:hover': { cursor: 'pointer' },
              }}
            >
              Reset Password
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;

// import { Box, Button, TextField, Typography } from '@mui/material';
// import React, { useState } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import Header from '../Header/Header';
// import axios from 'axios';

// const LoginPage = () => {
//   const navigate = useNavigate();

//   const [userVal, setUserVal] = useState({
//     email: '',
//     password: '',
//   });

//   const submitHandler = async () => {
//     if (userVal.email == '' || userVal.password == '') {
//       alert('please fill all the feilds');
//       return;
//     }

//     let options = {
//       url: 'http://localhost:7000/user/login',
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//       },
//       data: userVal,
//     };

//     try {
//       let response = await axios(options);
//       if (response.status == 200) {
//         if (response.data.msg == 'login successfull') {
//           alert('login successfull');
//           localStorage.setItem('userToken', response.data.token);
//           localStorage.setItem(
//             'userDetails',
//             JSON.stringify(response.data.findData)
//           );
//           navigate('/');
//         } else {
//           alert(response.data.msg);
//           return;
//         }
//       }
//     } catch (err) {
//       console.log('err', err);
//     }
//   };
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         rowGap: '30px',
//         width: '100%',
//       }}
//     >
//       <Header />
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           rowGap: '20px',
//           alignSelf: 'center',
//         }}
//       >
//         <Typography>Sign In</Typography>
//         <Box>
//           <Typography>Email</Typography>
//           <TextField
//             id="outlined-basic"
//             label="Email"
//             variant="outlined"
//             sx={{ backgroundColor: 'white' }}
//             value={userVal.email}
//             onChange={(e) => setUserVal({ ...userVal, email: e.target.value })}
//           />
//         </Box>
//         <Box>
//           <Typography>Password</Typography>
//           <TextField
//             id="outlined-basic"
//             label="Password"
//             variant="outlined"
//             sx={{ backgroundColor: 'white' }}
//             value={userVal.password}
//             onChange={(e) =>
//               setUserVal({ ...userVal, password: e.target.value })
//             }
//           />
//         </Box>
//         <Button variant="contained" onClick={submitHandler}>
//           Sign In
//         </Button>
//         <Box sx={{ display: 'flex', columnGap: '10px' }}>
//           <Typography>New Customer?</Typography>
//           <Typography
//             sx={{
//               color: 'blue',
//               textDecoration: 'underLine',
//               '&:hover': { cursor: 'pointer' },
//             }}
//             onClick={() => navigate('/SignUpPage')}
//           >
//             Create your account
//           </Typography>
//         </Box>
//         <Box sx={{ display: 'flex', columnGap: '10px' }}>
//           <Typography>Forgot Password</Typography>
//           <Typography
//             sx={{
//               color: 'blue',
//               textDecoration: 'underLine',
//               '&:hover': { cursor: 'pointer' },
//             }}
//           >
//             Reset Password
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default LoginPage;
