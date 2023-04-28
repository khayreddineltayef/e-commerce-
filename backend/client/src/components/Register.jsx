import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions';
import {  Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Register=()=> {
  const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
     const [password, setPassword] = useState("")


     const dispatch=useDispatch()
     const [emailError, setEmailError] = useState(false); // add a state to track the email error
     const {loading,users}=useSelector( (state)=>state.reducer)
     const handleSubmit=(e)=>{
            e.preventDefault()
            const newUser={fullName,email,password}
           dispatch(registerUser(newUser))
        
       setEmail("")
       setFullName("")
     setPassword("")

     }
     const handleEmailChange = (e) => {
      setEmail(e.target.value);
      setEmailError(!e.target.value.includes("@")); // check if the email contains "@"
    };
  return (
    <>
   {loading?<Spinner style={{marginLeft:"700px"}} animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>:
   users?<Navigate to="/login"/>:
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
             
              <Grid item xs={12} >

                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="username"
                  name="username"
                  autoComplete="family-name"
                  value={fullName} onChange={(e)=>setFullName(e.target.value)}
                />
              </Grid>
              {fullName.length >= 3 && fullName.length <= 20 ? (
  <h6 style={{marginLeft:"18px",color:"green"}}>Name is valid! </h6>
) : (
  <h6 style={{marginLeft:"18px",color:"red"}}>*Name must be within 3 to 20 characters! </h6>
)}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email} onChange={handleEmailChange}

                  error={emailError} // set the error state to display the error message
                />
                 {emailError && (
                      <Typography variant="caption" color="error">
                        Please enter a valid email address
                      </Typography>
                    )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password} onChange={(e)=>setPassword(e.target.value)}
                />
              </Grid>
              {password.length >= 8 && password.length <= 20 ? (
  <h6 style={{marginLeft:"18px",color:"green"}}>Password is valid! </h6>
) : (
  <h6 style={{marginLeft:"18px",color:"red"}}>*Password must be 8 to 20 characters long! </h6>
)}
  

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
           <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
           
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
     }
    </>
  );
}
export default Register

