import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const SignUpPage = () => {
  const [userVal, setUserVal] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });
  let navigate = useNavigate();

  async function submitHandler() {
    if (
      userVal.name == '' ||
      userVal.email == '' ||
      userVal.password == '' ||
      userVal.cpassword == ''
    ) {
      alert('Please fill all the details ');
    } else {
      let options = {
        url: 'http://localhost:7000/user',
        method: 'post',
        headers: { 'content-type': 'application/json' },
        data: userVal,
      };
      console.log(userVal);
      try {
        let response = await axios(options);
        if (response.status == 200) {
          if (response.data.message == 'User already Exist') {
            alert(response.data.message);
          } else {
            navigate('/LoginPage');
            console.log(response);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <Box>
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
          <Typography variant="h4">Sign Up</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '30px',
            }}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={(e) => {
                setUserVal({ ...userVal, name: e.target.value });
              }}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e) => {
                setUserVal({ ...userVal, email: e.target.value });
              }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={(e) => {
                setUserVal({ ...userVal, password: e.target.value });
              }}
            />
            <TextField
              id="outlined-basic"
              label="Confirm password"
              variant="outlined"
              onChange={(e) => {
                setUserVal({ ...userVal, cpassword: e.target.value });
              }}
            />
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              submitHandler();
            }}
          >
            Submit
          </Button>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              columnGap: '20px',
            }}
          >
            <Typography>Already have an account?</Typography>
            <Typography
              sx={{
                color: 'blue',
                textDecoration: 'underline',
                '&:hover': { cursor: 'pointer' },
              }}
              onClick={() => {
                navigate('/LoginPage');
              }}
            >
              Sign In
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SignUpPage;

// import { Box, Button, TextField, Typography } from '@mui/material';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../Header/Header';
// import axios from 'axios';

// const SignUpPage = () => {
//   const navigate = useNavigate();

//   const [userVal, setUserVal] = useState({
//     name: '',
//     email: '',
//     password: '',
//     cPassword: '',
//   });

//   const submitHandler = async () => {
//     if (
//       userVal.name == '' ||
//       userVal.email == '' ||
//       userVal.password == '' ||
//       userVal.cPassword == ''
//     ) {
//       alert('please fill all the feilds');
//       return;
//     }

//     let options = {
//       url: 'http://localhost:7000/user',
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//       },
//       data: userVal,
//     };

//     try {
//       let response = await axios(options);
//       if (response.status == 200) {
//         if (response.data.msg == 'inserted') {
//           alert('sign up successfull');
//           navigate('/LoginPage');
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
//           rowGap: '10px',
//           alignSelf: 'center',
//         }}
//       >
//         <Typography>Sign Up</Typography>
//         <Box>
//           <Typography>Name</Typography>
//           <TextField
//             id="outlined-basic"
//             label="Name"
//             variant="outlined"
//             sx={{ backgroundColor: 'white' }}
//             value={userVal.name}
//             onChange={(e) => setUserVal({ ...userVal, name: e.target.value })}
//           />
//         </Box>
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
//         <Box>
//           <Typography>Confirm Password</Typography>
//           <TextField
//             id="outlined-basic"
//             label="Confirm Password"
//             variant="outlined"
//             sx={{ backgroundColor: 'white' }}
//             value={userVal.cPassword}
//             onChange={(e) =>
//               setUserVal({ ...userVal, cPassword: e.target.value })
//             }
//           />
//         </Box>
//         <Button variant="contained" onClick={submitHandler}>
//           Sign Up
//         </Button>
//         <Box sx={{ display: 'flex', columnGap: '10px' }}>
//           <Typography>Already have an account?</Typography>
//           <Typography
//             sx={{
//               color: 'blue',
//               textDecoration: 'underLine',
//               '&:hover': { cursor: 'pointer' },
//             }}
//             onClick={() => navigate('/LoginPage')}
//           >
//             Sing in
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default SignUpPage;
