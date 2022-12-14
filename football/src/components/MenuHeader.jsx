import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Link from "@mui/material/Link";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
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
import { Navigate } from "react-router-dom";
import { async } from "@firebase/util";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import _ from "lodash";

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
  const [data, setData] = useState([]);
  const [business, setBusinessID] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      getDataBusiness();
    }
  }, [currentUser]);

  const getDataBusiness = () => {
    const getFootBallData = collection(db, 'business')
    const queryCalender = query(getFootBallData, where("manager", "==", `${currentUser.uid}`))
    getDocs(queryCalender)
      .then(response => {
        const datsans = response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
        }))
        setBusinessID(datsans)
      })
  }

  const getData = () => {
    const getdataDatSan = collection(db, "users");
    getDocs(getdataDatSan)
      .then((response) => {
        const datsans = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setData(datsans);
      })
      .catch((error) => console.log(error.message));
  };
  const loadMenu = () => {
    var dataclone = _.cloneDeep(data);
    if(currentUser) {
      const data123 = dataclone.find((item) => item.data.uid === currentUser.uid)
      console.log('data123?.data.rule === "business" && data123?.data.status === false', data123?.data.rule === "business" && data123?.data.status === false);
      if(data123?.data.rule === "business" && data123?.data.status === false){
        return (<>{getData()}</>)
      } else {
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
                    Trang Ch???
                  </Link>
                  <Link underline="none" href="/match" color="#757575">
                    Thi ?????u
                  </Link>
                  {data.map((item) => {
                    if (
                      currentUser &&
                      item.data.uid === currentUser.uid &&
                      (item.data.rule === "admin" || item.data.rule === "business")
                    ) {
                      return (
                        <Link underline="none" href={`/calender/${business[0]?.id}`} color="#757575">
                          L???ch Thi ?????u
                        </Link>
                      );
                    }
                  })}
                </Box>
                {currentUser === null ? (
                  <ThemeProvider theme={theme}>
                    <Button
                      sx={{ marginLeft: "auto" }}
                      variant="contained"
                      color="neutral"
                    >
                      <Link href="/login" underline="none" color="#fafafa">
                        ????ng Nh???p
                      </Link>
                    </Button>
                    <Button
                      sx={{ marginLeft: "10px" }}
                      variant="contained"
                      color="neutral"
                    >
                      <Link underline="none" href="/selectModule" color="#fafafa">
                        ????ng K??
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
                      <CustomizedDialogs />
                      <Typography
                        variant="h7"
                        component="h7"
                        sx={{
                          marginTop: "5%",
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
                      <Button onClick={async () => await auth.signOut()}>
                        SignOut
                      </Button>
                    </Box>
                  </ThemeProvider>
                )}
              </>
            </Toolbar>
          </AppBar>
        </React.Fragment>
        )
      }
    }
    else {
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
                  Trang Ch???
                </Link>
                <Link underline="none" href="/match" color="#757575">
                  Thi ?????u
                </Link>
                {data.map((item) => {
                  if (
                    currentUser &&
                    item.data.uid === currentUser.uid &&
                    (item.data.rule === "admin" || item.data.rule === "business")
                  ) {
                    return (
                      <Link underline="none" href={`/calender/${business[0]?.id}`} color="#757575">
                        L???ch Thi ?????u
                      </Link>
                    );
                  }
                })}
              </Box>
              {currentUser === null ? (
                <ThemeProvider theme={theme}>
                  <Button
                    sx={{ marginLeft: "auto" }}
                    variant="contained"
                    color="neutral"
                  >
                    <Link href="/login" underline="none" color="#fafafa">
                      ????ng Nh???p
                    </Link>
                  </Button>
                  <Button
                    sx={{ marginLeft: "10px" }}
                    variant="contained"
                    color="neutral"
                  >
                    <Link underline="none" href="/selectModule" color="#fafafa">
                      ????ng K??
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
                    <CustomizedDialogs />
                    <Typography
                      variant="h7"
                      component="h7"
                      sx={{
                        marginTop: "5%",
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
                    <Button onClick={async () => await auth.signOut()}>
                      SignOut
                    </Button>
                  </Box>
                </ThemeProvider>
              )}
            </>
          </Toolbar>
        </AppBar>
      </React.Fragment>
      )
    }
  }
  return (

   <div>
    {loadMenu()}
   </div>
  );
}
