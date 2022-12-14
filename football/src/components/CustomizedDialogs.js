import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useState, useContext, useEffect } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onClickdongy = (value) => {
    const FootBallData = doc(db, "ghepdoi", value);

    updateDoc(FootBallData, {
      confirm: true,
    }).then(() => {
      handleClose();
      getData();
    });
  };
  const onClickKhongDongy = (value) => {
    const FootBallData = doc(db, "ghepdoi", value);

    updateDoc(FootBallData, {
      confirm: false,
    }).then(() => {
      handleClose();
      getData();
    });
  };
  const { currentUser } = useContext(AuthContext);

  const getData = () => {
    const getdataDatSan = collection(db, "ghepdoi");
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
  useEffect(() => {
    getData();
  }, []);
  const openConfirm = () => {
    return (
      <>
        {data.map((item) => {
          if (
            currentUser.uid === item.data.createWith &&
            item.data.confirm === ""
          ) {
            return (
              <>
                <Typography gutterBottom>
                  {item.data.name} mu???n gh??p ?????i v???i b???n v??o ng??y{" "}
                  {item.data.presetDate1?.presetDate} t???i s??n{" "}
                  {item.data.nameField}
                  <DialogActions>
                    <Button
                      autoFocus
                      onClick={(e) => {
                        onClickdongy(item.id);
                      }}
                    >
                      ?????ng ??
                    </Button>
                    <Button
                      autoFocus
                      onClick={(e) => {
                        onClickKhongDongy(item.id);
                      }}
                    >
                      T??? Ch???i
                    </Button>
                  </DialogActions>
                </Typography>
              </>
            );
          } else if (
            currentUser.uid === item.data.createBy &&
            item.data.confirm === true
          ) {
            return (
              <Typography gutterBottom>
                {item.data.name} ???? gh??p ?????i th??nh c??ng v???i b???n v??o ng??y{" "}
                {item.data.presetDate1?.presetDate} t???i s??n{" "}
                {item.data.nameField}
              </Typography>
            );
          } else if (
            currentUser.uid === item.data.createBy &&
            item.data.confirm === false
          ) {
            return (
              <Typography gutterBottom>
                {item.data.name} ???? t??? ch???i gh??p ?????i v???i b???n v??o ng??y{" "}
                {item.data.presetDate1?.presetDate} t???i s??n{" "}
                {item.data.nameField}
              </Typography>
            );
          } else {
            return <p> hi???n t???i kh??ng c?? d??? li???u n??o</p>;
          }
        })}
      </>
    );
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="secondary"
        onClick={handleClickOpen}
      >
        <Badge badgeContent={17} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Danh s??ch gh??p ?????i
        </BootstrapDialogTitle>
        <DialogContent dividers>{openConfirm()}</DialogContent>
      </BootstrapDialog>
    </div>
  );
}
