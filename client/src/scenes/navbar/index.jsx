import React from 'react'
import { useState } from "react";

import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";

import { useNavigate } from "react-router-dom";

import FlexBetween from "components/FlexBetween";

const Navbar = () => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false); //for checking ifwe want to open mobile toggle menu or keep it closed
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); //easy way to use media query in react, tells if the size of the screen of a user is more/less than the specified 

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div>index</div>
  )
}

export default Navbar