
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProfile, updateUser } from "../redux/actions";
import { Grid, TextField } from "@mui/material";

const Profile = () => {
  const { users } = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(users.fullName || "");
  const [phone, setPhone] = useState(users.phone || "");
  const [adress, setAdress] = useState(users.adress || "");
  const [img, setImg] = useState(localStorage.getItem(users.email + "_profileImage") || users.img);


  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImg(url);
    localStorage.setItem(users.email + "_profileImage", url);
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();
    const id = users._id;
    const userData = {
      fullName,
      phone,
      adress,
      img: img,
    };
    dispatch(updateUser(id, userData));
    toast.success('you have successfully updated your profile');
  };
 
  
  return (
    <div>
      <img src={img||users.img} alt="" style={{ marginLeft: '350px', borderRadius: '50%',width:"200px",height:"200px" }} />
      <input type="file" onChange={handleImageChange} style={{ marginLeft: '350px', marginTop: '15px' }} />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              id="fullName"
              label="Full Name"
              variant="outlined"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="phone"
              label="Phone"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address"
              label="Address"
              variant="outlined"
              fullWidth
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField id="email" label="Email" variant="outlined" fullWidth value={users.email} disabled />
          </Grid>
        </Grid>
        <button type="submit">update</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Profile;

