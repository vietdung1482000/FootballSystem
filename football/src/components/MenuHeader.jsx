import React, { useContext, useState } from "react";
import styled from "styled-components";
import Link from "@mui/material/Link";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Menu } from "@mui/icons-material";
import CustomizedDialogs from "./CustomizedDialogs";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#4caf50",
      contrastText: "#fff",
    },
  },
  secondary: {
    main: "#4caf50",
  },
});

export default function MenuHeader() {

  const { currentUser } = useContext(AuthContext);
  return (
    <React.Fragment>
      <AppBar sx={{ background: "white" }}>
        <Toolbar>
          <>
            <Box
              sx={{
                paddingRight: "50%",
                margin: "auto",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                typography: "body1",
                "& > :not(style) + :not(style)": {
                  ml: 2,
                },
              }}
            >
              <Link href="/" underline="none" color="#757575">
                Trang Chủ
              </Link>
              <Link underline="none" href="/match" color="#757575">
                Thi Đấu
              </Link>
              <Link underline="none" href="/calender" color="#757575">
                Lịch Thi Đấu
              </Link>
            </Box>
            {currentUser === null ? (
              <ThemeProvider theme={theme}>
                <Button
                  sx={{ marginLeft: "auto" }}
                  variant="contained"
                  color="neutral"
                >
                  <Link href="/login" underline="none" color="#fafafa">
                    Đăng Nhập
                  </Link>
                </Button>
                <Button
                  sx={{ marginLeft: "10px" }}
                  variant="contained"
                  color="neutral"
                >
                  <Link underline="none" href="/selectModule" color="#fafafa">
                    Đăng Ký
                  </Link>
                </Button>
              </ThemeProvider>
            ) : (
              <ThemeProvider theme={theme}>
                <Box
                  sx={{
                    margin: "auto",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    typography: "body1",
                    "& > :not(style) + :not(style)": {
                      ml: 2,
                    },
                  }}
                >
                    <CustomizedDialogs/>
                  <Typography
                    variant="h7"
                    component="h7"
                    sx={{
                      marginTop: "10%",
                    }}
                  >
                    <Link underline="none" color="#212121">
                      {" "}
                      {currentUser?.displayName}
                    </Link>
                  </Typography>
                  <Tooltip>
                    <IconButton sx={{ p: 0 }}>
                      <Avatar src={currentUser?.photoURL} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ThemeProvider>
            )}
          </>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
