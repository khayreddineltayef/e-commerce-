
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.reducer.users);
  const error = useSelector((state) => state.reducer.errors);
  const status = useSelector((state) => state.reducer.status); // get the status field
  console.log(error);
  // console.log(user);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
const Navigate=useNavigate()
  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
    setPasswordsMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordsMatch(event.target.value === newPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      // Display error message to user
      console.log("Passwords do not match");
      return;
    }

    // Dispatch updatePassword action
    dispatch(updatePassword(user._id, oldPassword, newPassword));
 
    
  };
  // Listen to changes in the status field
  useEffect(() => {
    if (status === 'success') {
      // Navigate to the profile page
      Navigate('/profile');
    }
  }, [status,Navigate]);

  return (
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
          Update Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Old Password"
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {error && error === "Invalid old password" && <h6 style={{color:"red"}}>{error}</h6>}
          <TextField
            margin="normal"
            required
            fullWidth
            label="New Password"
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
          />
{error === "New password cannot be the same as the old password" && (
  <h6 style={{color:"red"}}>{error}</h6>
)}

          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm New Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
       
           <h6 className={passwordsMatch ? "match" : "no-match"}>
           {passwordsMatch ? <h6 style={{color:"green"}}>*Passwords match!</h6> : <h6 style={{color:"red"}}>*Passwords do not match.</h6>}

          </h6>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdatePassword;
