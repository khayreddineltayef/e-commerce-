import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";

const MainListItems = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const user = useSelector((state) => state.reducer.users);

  const [showModal, setShowModal] = React.useState(false);

  const handleDeleteAccount = () => {
    setShowModal(true);
  };

  const handleConfirmDeleteAccount = () => {
    dispatch(deleteUser(user._id));
    localStorage.removeItem("token");
    setShowModal(false);
    Navigate("/register");
  };

  const handleCancelDeleteAccount = () => {
    setShowModal(false);
  };

  return (
    <>
      <ListItemButton>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText
          style={{ color: "blue", textDecoration: "underline" }}
          primary="Profile"
        />
      </ListItemButton>
      <Link to="/carts">
        {" "}
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Cards" />
        </ListItemButton>
      </Link>
      <Link to="/orders">
        {" "}
        <ListItemButton>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Setted orders" />
        </ListItemButton>
      </Link>

      <ListItemButton onClick={handleDeleteAccount}>
        <ListItemIcon>
          <PersonRemoveIcon />
        </ListItemIcon>
        <ListItemText
          style={{ color: "blue", textDecoration: "underline" }}
          primary="Delete account"
        />
      </ListItemButton>
      <Link to="/updatePassword">
        {" "}
        <ListItemButton>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary="Password" />
        </ListItemButton>
      </Link>

      <Modal
        open={showModal}
        onClose={handleCancelDeleteAccount}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ backgroundColor: "white", p: 2 }}>
          <h2 id="modal-title">Confirm account deletion</h2>
          <p id="modal-description">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>
          <Button onClick={handleConfirmDeleteAccount}>Confirm</Button>

          <Button onClick={handleCancelDeleteAccount}>Cancel</Button>
        </Box>
      </Modal>
    </>
  );
};

export default MainListItems;
export const mainListItems = <MainListItems />;
